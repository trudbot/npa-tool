<script setup lang="ts">
import {GraphData} from "@antv/g6";
import {onMounted, ref, watch, watchEffect} from "vue";
import {defaultG6Graph} from "./config/graphConfig";
import {GraphLayoutPredict} from "@antv/vis-predict-engine";
import G6 from '@antv/g6'
import {getOriginalObjectOfProxy} from "../../utils/getOriginalObjectOfProxy.ts";

const props = defineProps<{
  height: number,
  width: number,
  data: GraphData
}>();

const emit = defineEmits<{
  nodeClick: [id: number]
}>();

onMounted( () => {
  const graph = new G6.Graph(defaultG6Graph);
  // // AI预测图最适合的布局
  // const {predictLayout, confidence} = await GraphLayoutPredict.predict(getOriginalObjectOfProxy(props.data));
  // defaultG6Graph.layout.type = predictLayout;
  graph.data(getOriginalObjectOfProxy(props.data));


  // 监听数据变化， 自动重新渲染图
  watch(() => props.data, () => {
    graph.changeData(getOriginalObjectOfProxy(props.data));
  });

  // 顶点点击事件
  graph.on('node:click', (e) => {
    emit('nodeClick', e.item.getID());
  })

  graph.render();

  function refreshDragedNodePosition(e) {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  }

  graph.on('node:dragstart', (e) => {
    // 拖动节点时重新布局
    graph.layout();
    refreshDragedNodePosition(e);
  });

  graph.on('node:drag', (e) => {
    refreshDragedNodePosition(e);
  });

  graph.on('node:dragend', (e) => {
    e.item.get('model').fx = null;
    e.item.get('model').fy = null;
  });
})
</script>

<template>
  <div class="graph-container"></div>
</template>

<style scoped>

</style>

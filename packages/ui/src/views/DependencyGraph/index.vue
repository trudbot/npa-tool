<script setup lang="ts">
import {GraphData, Item} from "@antv/g6";
import { onMounted,watch} from "vue";
import { defaultG6Graph } from "./config/graphConfig";
import G6 from "@antv/g6";
import { getOriginalObjectOfProxy } from "../../utils/getOriginalObjectOfProxy.ts";
import {light as colors, dark as strokes} from '../../assets/colorSystem.ts'

const props = defineProps<{
  height: number;
  width: number;
  data: GraphData | undefined;
}>();

const emit = defineEmits<{
  nodeClick: [id: number];
  nodeDBClick: [id: number];
}>();

// 自定义结点和边的样式
function change(data:any) {
  // 自定义节点
  const nodes = data.nodes;
  const depthMap = new Map();
  let depthId = 0;
  nodes.forEach((element: any) => {
    // cluster
    if (element.cluster && depthMap.get(element.cluster) === undefined) {
      depthMap.set(element.cluster, depthId);
      depthId++;
    }
    const cid = depthMap.get(element.cluster);
    if (!element.style) {
      element.style = {};
    }
    element.style.fill = colors[cid % colors.length];
    element.style.stroke = strokes[cid % strokes.length];
  });

  // 自定义边
  const edges = data.edges;
  const edgesMap = new Map();
  let edgesId = 0;
  edges.forEach((element: any) => {
    if (element.info && edgesMap.get(element.info) === undefined) {
      edgesMap.set(element.info, edgesId);
      edgesId++;
    }
    const cid = edgesMap.get(element.info);
    if (!element.style) {
      element.style = {};
    }
    element.color = colors[cid % colors.length];
  });
}

onMounted(() => {
  const graph = new G6.Graph(defaultG6Graph);

  // 监听数据变化， 自动重新渲染图
  watch(
      () => props.data,
      () => {
        if (props.data === undefined) {
          return;
        }
        let newData = getOriginalObjectOfProxy(props.data);
        // 自定义节点/边
        change(newData);

        graph.changeData(newData);
      },
      {immediate: true}
  );

  // 容器大小
  watch([() => props.height, () => props.width], async () => {
    await graph.changeSize(props.width, props.height);
    await graph.fitView();
  },{immediate: true});


  // 顶点点击事件
  graph.on("node:click", (e) => {
    emit("nodeClick", parseInt((e.item as Item).getID()));
  });

  // 顶点双击
  graph.on("node:dblclick", (e) => {
    emit("nodeDBClick", parseInt((e.item as Item).getID()));
  })

  // 大大大大坑
  // 上述代码changeData后， 会重新进行布局
  // 重新进行布局后， 需要重新调用fitView调整缩放
  // 而布局是异步的， 所以必须等布局结束后进行fitView
  // 参考: https://github.com/antvis/G6/issues/4238
  graph.on('afterlayout', () => {
    graph.fitView()
  });

  graph.render();
});
</script>

<template>
  <div id="graph-container"></div>
</template>

<style scoped></style>

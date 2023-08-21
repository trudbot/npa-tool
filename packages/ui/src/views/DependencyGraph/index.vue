<script setup lang="ts">
import {GraphData, Item} from "@antv/g6";
import { onMounted,watch} from "vue";
import { defaultG6Graph } from "./config/graphConfig";
import G6 from "@antv/g6";
import { getOriginalObjectOfProxy } from "../../utils/getOriginalObjectOfProxy.ts";

const props = defineProps<{
  height: number;
  width: number;
  data: GraphData;
}>();

const emit = defineEmits<{
  nodeClick: [id: number];
}>();

const colors = [
  "#BDD2FD",
  "#BDEFDB",
  "#C2C8D5",
  "#FBE5A2",
  "#F6C3B7",
  "#B6E3F5",
  "#D3C6EA",
  "#FFD8B8",
  "#AAD8D8",
  "#FFD6E7",
];
const strokes = [
  "#5B8FF9",
  "#5AD8A6",
  "#5D7092",
  "#F6BD16",
  "#E8684A",
  "#6DC8EC",
  "#9270CA",
  "#FF9D4D",
  "#269A99",
  "#FF99C3",
];

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
  graph.data(getOriginalObjectOfProxy(props.data));
  graph.changeSize(props.width, props.height);

  // 监听数据变化， 自动重新渲染图
  watch(
      () => props.data,
      () => {
        const newData = getOriginalObjectOfProxy(props.data);
        // 自定义节点/边
        change(newData);
        graph.changeData(newData);
      },
      {immediate: true}
  );

  // 顶点点击事件
  graph.on("node:click", (e) => {
    emit("nodeClick", parseInt((e.item as Item).getID()));
  });

  graph.render();
});
</script>

<template>
  <div id="graph-container"></div>
</template>

<style scoped></style>

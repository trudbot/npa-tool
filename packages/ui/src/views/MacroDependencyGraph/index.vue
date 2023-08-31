<script setup lang="ts">
import {GraphData, Item} from "@antv/g6";
import {onMounted, watch} from "vue";
import {defaultG6Graph} from "./config/graphConfig";
import G6 from "@antv/g6";
import {getOriginalObjectOfProxy} from "../../utils/getOriginalObjectOfProxy";
import {light as colors, dark as strokes} from "../../assets/colorSystem.ts";

const props = defineProps<{
  height: number;
  width: number;
  data: GraphData | undefined;
}>();

const emit = defineEmits<{
  nodeClick: [id: number];
  nodeDBClick: [id: number];
}>();

function change(data: any) {
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
}

onMounted(() => {
  const graph = new G6.Graph(defaultG6Graph);

  // 鼠标移出移入节点效果
  graph.on("node:mouseenter", function (evt: any) {
    const node = evt.item;
    const edges = node.getEdges();
    edges.forEach((item: any) => {
      graph.updateItem(item, {
        style: {
          lineWidth: 2,
          shadowColor: node.getModel().style.stroke,
          strokeOpacity: 0.8,
          shadowBlur: 10,
          stroke: node.getModel().style.fill,
          endArrow: {
            path: "M 0,0 L 8,4 L 8,-4 Z",
          },
        },
      });
    });
    graph.updateItem(node, {
      size: 30,
      style: {
        shadowColor: node.getModel().style.stroke,
        strokeOpacity: 0.5,
        shadowBlur: 20,
      },
    });
  });
  graph.on("node:mouseleave", function (evt: any) {
    const node = evt.item;
    const edges = node.getEdges();
    edges.forEach((item: any) => {
      graph.updateItem(item, {
        style: {
          lineWidth: 1,
          stroke: "#e0e0e0",
          shadowColor: "",
          strokeOpacity: 1,
          shadowBlur: 0,
          endArrow: {
            path: "",
            fill: "",
          },
        },
      });
    });
    graph.updateItem(node, {
      size: 20,
      style: {
        shadowColor: "",
      },
    });
  });
  //

  // 监听数据变化， 自动重新渲染图
  watch(
      () => JSON.stringify(props.data),
      () => {
        if (props.data === undefined) {
          return;
        }
        const newData = getOriginalObjectOfProxy(props.data);
        // 自定义节点/边
        change(newData);
        graph.changeData(newData);
      },
      {immediate: true}
  );
  //

  // 容器大小
  watch([() => props.height, () => props.width], () => {
    graph.changeSize(props.width, props.height);
    graph.fitView();
  }, {immediate: true});
  //

  // 重新布局后， 自动调整图的缩放和位置
  graph.on('afterlayout', () => {
    graph.fitView()
  });
  //


  // 拖动节点时重新布局
  function refreshDragedNodePosition(e) {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  }

  graph.on('node:drag', (e) => {
    refreshDragedNodePosition(e);
  });

  graph.on('node:dragend', (e) => {
    graph.layout()
    e.item.get('model').fx = null;
    e.item.get('model').fy = null;
  });
  //

  // 顶点单击
  graph.on("node:click", (e) => {
    emit("nodeClick", parseInt((e.item as Item).getID()));
  });

  // 顶点双击
  graph.on("node:dblclick", (e) => {
    emit("nodeDBClick", parseInt((e.item as Item).getID()));
  })

  graph.render();
});
</script>

<template>
  <div id="graph-container"></div>
</template>

<style scoped></style>

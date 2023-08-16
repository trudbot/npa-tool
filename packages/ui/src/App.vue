<template>
  <div id="graph-container">
    <DependencyGraph :data="data" :width="1920" :height="1080" @nodeClick="foobar"></DependencyGraph>
  </div>
</template>

<script setup lang="ts">

import DependencyGraph from './views/DependencyGraph/index.vue'

import {onMounted, ref} from "vue";
import jsonData from "../public/data.json"
// import G6 from '@antv/g6';

const edges = jsonData.edges
const nodes = jsonData.nodes

const data = ref({
  nodes: nodes.map((e, idx) => {
    return {
      id: idx.toString(),
      label: e.name + '@' + e.version,
      cluster:e.depth,
      name:e.name,
      version:e.version,
      path:e.path
    }
  }),
  // 边集
  edges: edges.map((e) => {
    return {
      source: e.from.toString(),
      target: e.to.toString(),
      info:e.info,
    }
  })
});

data.value.nodes[0].fx = 0
data.value.nodes[0].fy = 0

// function foo() {
//   data.value = {
//     nodes: [
//       {
//         id:
//             '1',
//         label:
//             '1'
//       },
//       {
//         id: '2',
//         label: '2'
//       }
//     ],
//     edges: [
//       {
//         source: '1',
//         target: '2'
//       }
//     ]
//   }
// }

function foobar(id:any) {
  console.log(id)
}

onMounted(() => {
  // console.log(nodes.map((e, idx) => {
  //   return {
  //     id: idx.toString(),
  //     label: e.name + '@' + e.version
  //   }
  // }))
  // console.log(edges.map((e) => {
  //   return {
  //     source: e.from.toString(),
  //     target: e.to.toString()
  //   }
  // }))
})
</script>

<style scoped>

</style>

<template>
    <div id="graph-container">
        <DependencyGraph :data="data" :width="1920" :height="1080" @nodeClick="foobar"></DependencyGraph>
        <!-- <button @click="btn">改变</button> -->
    </div>
</template>

<script setup lang="ts">
import DependencyGraph from "./views/DependencyGraph/index.vue";

import { onMounted, ref, shallowRef } from "vue";
import jsonData from "../public/data.json";
// import G6 from '@antv/g6';

const edges = jsonData.edges;
const nodes = jsonData.nodes;

const data = shallowRef({
    nodes: nodes.map((e, idx) => {
        return {
            id: idx.toString(),
            label: e.name + "@" + e.version,
            cluster: e.depth,
            name: e.name,
            version: e.version,
            path: e.path,
        };
    }),
    // 边集
    edges: edges.map((e) => {
        return {
            source: e.from.toString(),
            target: e.to.toString(),
            info: e.info,
        };
    }),
});

data.value.nodes[0].fx = 0;
data.value.nodes[0].fy = 0;

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

// 测试
// function btn() {
//     console.log(data.value);

//     let objNode: any = {
//         cluster: 4,
//         id:"41",
//         label:"isaacs/cliui@8.0.2",
//         name: "isaacs/cliui",
//         path: "node_modules/@isaacs/cliui",
//         version: "8.0.2",
//     };
//     let objEdge: any = {
//         info: "dependencies",
//         source: '10',
//         target: '25',
//     };
//     data.value = {
//         nodes: [...data.value.nodes, objNode],
//         edges: [...data.value.edges, objEdge],
//     };
//     // data.value.nodes.push(objNode);
//     // data.value.edges.push(objEdge);
//     console.log(data.value);
// }

function foobar(id: any) {
    console.log(id);
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
});
</script>

<style scoped></style>

<script setup lang="ts">
import { Pie } from '@antv/g2plot';
import {useDependencyData} from "../../../stores/dependencyData.ts";
import {computed, onMounted, ref, watch} from "vue";
import PiePlot from "./PiePlot.vue";
import GraphModule from './GraphModule.vue';

const graphDataStore = useDependencyData();

const licensesArr =  ref([''])
licensesArr.value = graphDataStore.licensesList.map((it)=>it.licenseName)

function adjustLength(label: string) {
  if (label.length >= 12) {
    return label.slice(0, 9) + "...";
  }
  return label;
}

const colors = ref([
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
]);

// const colorList = computed(() => {
//   return graphDataStore.packagesList.map(() => {
//     return colors[Math.floor(Math.random() * 10)]
//   });
// })

// const licenseColorList = computed(() => {
//   return graphDataStore.licensesList.map(() => {
//     return colors[Math.floor(Math.random() * 10)]
//   });
// })

</script>

<template>
  <div class="graph-data-container">
    <el-collapse accordion>
      <el-collapse-item>
        <template #title>
          <div class="item-title">{{ graphDataStore.packagesList.length + ' Modules' }}</div>
        </template>
        <template #default>
          <el-scrollbar max-height="50vh">
            <!-- <el-tag round v-for="(item, index) in graphDataStore.packagesList"
                     class="tag"
                    :color="colorList[index]"
            >
              {{ adjustLength(item) }} 
            </el-tag>  -->
            <GraphModule module-name="xxx" :modules-arr="graphDataStore.packagesList"/>
          </el-scrollbar>
        </template>
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <div class="item-title">{{ graphDataStore.licensesList.length + ' Licenses' }}</div>
        </template>
        <template #default>
          <el-scrollbar height="50vh">
            <el-tag round v-for="(item, index) in graphDataStore.licensesList"
                    class="tag"
                    :key="index"
                    :color="colors[Math.floor(Math.random() * 10)]">
              {{ adjustLength(item.licenseName) }}
            </el-tag>
            <!-- <GraphModule :modules-arr="licensesArr"/> -->
            <PiePlot></PiePlot>
          </el-scrollbar>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped lang="less">
.graph-data-container {

  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  padding: 15px;

  .item-title {
    font-weight: bold;
  }

  .tag {
    font-family: monospace;
    width: 25%;
    margin: 2%;
    font-size: 14px;
    font-weight: 545; 
    color: rgb(0, 0, 0);
  }
}
</style>

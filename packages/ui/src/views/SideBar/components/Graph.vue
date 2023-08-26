<script setup lang="ts">
import { Pie } from '@antv/g2plot';
import {useDependencyData} from "../../../stores/dependencyData.ts";
import {computed, onMounted, ref, watch} from "vue";
import PiePlot from "./PiePlot.vue";

const graphDataStore = useDependencyData();

function adjustLength(label: string) {
  if (label.length >= 13) {
    return label.slice(0, 9) + "...";
  }
  return label;
}

const colors = [
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
const colorList = computed(() => {
  return graphDataStore.packagesList.map(() => {
    return colors[Math.floor(Math.random() * 9)]
  });
})

const licenseColorList = computed(() => {
  return graphDataStore.licensesList.map(() => {
    return colors[Math.floor(Math.random() * 9)]
  });
})

</script>

<template>
  <div class="graph-data-container">
    <el-collapse accordion>
      <el-collapse-item>
        <template #title>
          <div class="item-title">{{ graphDataStore.packagesList.length + ' Modules' }}</div>
        </template>
        <template #default>
          <el-scrollbar height="50vh">
            <el-tag round v-for="(item, index) in graphDataStore.packagesList"
                     class="tag"
                    :color="colorList[index]"
            >
              {{ adjustLength(item) }}
            </el-tag>
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
                    :color="licenseColorList[index]"
            >
              {{ item.licenseName}}
            </el-tag>
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
    font-size: 10px;
    color: white;
  }
}
</style>

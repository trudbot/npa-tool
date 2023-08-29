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
    <div class="graph-type-switcher graph-info-item">
      <img width="40" height="40" src="../../../assets/icons/flow_chart.svg" alt="">
      <label class="switch btn-color-mode-switch">
        <input type="checkbox" name="color_mode" id="color_mode" value="1" v-model="graphDataStore.forceLayout">
        <label for="color_mode" data-on="Force" data-off="Dagre" class="btn-color-mode-switch-inner"></label>
      </label>
      <img width="40" height="40" src="../../../assets/icons/Diagram-4.svg" alt="">
    </div>
    <el-collapse accordion class="graph-info-item">
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
    color: rgb(69, 69, 69);
  }

  .graph-info-item {
    margin-bottom: 10px;
  }
}

.graph-type-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  .btn-container{
    display: block;
    text-align: center;
  }

  .btn-container img{
    display: inline-block;
    position: relative;
    top: -9px;
  }

  label {
    font-size: 13px;
    color: #424242;
    font-weight: 500;
  }

  .btn-color-mode-switch{
    display: inline-block;
    margin: 0px;
    position: relative;
  }

  .btn-color-mode-switch > label.btn-color-mode-switch-inner{
    margin: 0;
    width: 200px;
    height: 30px;
    background: #E0E0E0;
    border-radius: 26px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    /*box-shadow: 0px 0px 8px 0px rgba(17, 17, 17, 0.34) inset;*/
    display: block;
  }

  .btn-color-mode-switch > label.btn-color-mode-switch-inner:before{
    content: attr(data-on);
    position: absolute;
    font-size: 12px;
    font-weight: 500;
    top: 7px;
    right: 20px;

  }

  .btn-color-mode-switch > label.btn-color-mode-switch-inner:after{
    content: attr(data-off);
    width: 100px;
    height: 16px;
    background: #fff;
    border-radius: 26px;
    position: absolute;
    left: 2px;
    top: 2px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0px 0px 6px -2px #111;
    padding: 5px 0px;
  }

  .btn-color-mode-switch > .alert{
    display: none;
    background: #FF9800;
    border: none;
    color: #fff;
  }

  .btn-color-mode-switch input[type="checkbox"]{
    cursor: pointer;
    width: 50px;
    height: 25px;
    opacity: 0;
    position: absolute;
    top: 0;
    z-index: 1;
    margin: 0px;
  }

  .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner{
    background: #151515;
    color: #fff;
  }

  .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:after{
    content: attr(data-on);
    left: 98px;
    background: #3c3c3c;
  }

  .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:before{
    content: attr(data-off);
    right: auto;
    left: 20px;
  }

  .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner{
    /*background: #66BB6A; */
    /*color: #fff;*/
  }

  .btn-color-mode-switch input[type="checkbox"]:checked ~ .alert{
    display: block;
  }

}
</style>

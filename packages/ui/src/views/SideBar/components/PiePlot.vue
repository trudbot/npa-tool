<script setup lang="ts">
import {onMounted, watch} from "vue";
import { Pie } from '@antv/g2plot';
import {useDependencyData} from "../../../stores/dependencyData.ts";
const graphDataStore = useDependencyData();
onMounted(() => {
  const pie = new Pie('pie', {
    data: [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 },
    ],
    angleField: 'value',
    colorField: 'type',
  });
  watch(() => graphDataStore.pieData, () => {
    pie.changeData(JSON.parse(JSON.stringify(graphDataStore.pieData)));
  }, {immediate: true});
  pie.render()
})
</script>

<template>
  <div id="pie"></div>
</template>

<style scoped lang="less">

</style>

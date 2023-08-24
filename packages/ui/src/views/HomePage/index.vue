<script setup lang="ts">
import NodeInfoSideBar from "../NodeInfoSideBar/index.vue";
import DependencyGraph from "../DependencyGraph/index.vue"
import {computed, onMounted, ref, shallowRef, watch} from "vue";
import {useDependencyData} from "../../stores/dependencyData.ts";
import {useRouter} from "vue-router";
import {useSelectedPackageData} from "../../stores/selectedPackageData.ts";

const dependencyDataStore = useDependencyData();
const router = useRouter();
const selectedPackageStore = useSelectedPackageData();
const graphBox = ref(null);
const width = ref(1000);
const height = ref(800);

const props = defineProps<{
  id: string,
  depth: string
}>();

// 查看某个包的依赖
function viewPackageDependencies(id: number, depth: number) {
  router.push({
    name: "Graph",
    params: {
      id: id,
      depth: depth
    }
  })
}

onMounted(() => {
  watch([() => props.id, () => props.depth], () => {
    dependencyDataStore.setArgs(parseInt(props.id), parseInt(props.depth));
  }, {immediate: true});

  width.value = graphBox.value.clientWidth;
  height.value = graphBox.value.clientHeight;
  window.addEventListener("resize", () => {
    const container = graphBox.value;
    if (!container || !container.clientWidth || !container.clientHeight) return;
    width.value = container.clientWidth;
    height.value = container.clientHeight;
  })
})


</script>

<template>
  <div id="graph" ref="graphBox">
    <DependencyGraph :data="dependencyDataStore.graphData" :width="width" :height="height"
                     @nodeDBClick="nodeID => viewPackageDependencies(nodeID, -1)"
                     @nodeClick="nodeId => selectedPackageStore.setSelected(nodeId)"
    >
    </DependencyGraph>
    <NodeInfoSideBar></NodeInfoSideBar>
  </div>
</template>

<style scoped lang="less">

#graph {
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px black solid;
}
</style>

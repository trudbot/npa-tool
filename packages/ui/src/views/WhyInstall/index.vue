<script setup lang="ts">
import {onMounted, ref, shallowRef} from "vue";
import {whyPackageInstalled} from "../../apis/graphDependencies.ts";
import DependencyGraph from "../DependencyGraph/index.vue";

const graphBox = ref(null);
const width = ref(600);
const height = ref(400);
function loadNewSize() {
  const container: Element = graphBox.value;
  if (!container || !container.clientWidth || !container.clientHeight) return;
  width.value = container.clientWidth;
  height.value = container.clientHeight;
}

const data = shallowRef(undefined);

const props = defineProps<{
  id: string
}>()

onMounted(() => {
  console.log("abc")
  loadNewSize();

  whyPackageInstalled({id: parseInt(props.id)}).then(res => {
    console.log(props.id)
    data.value = {
      nodes: res.data.nodes.map((e, idx) => {
        return {
          id: e.id.toString(),
          label: e.name + "@" + e.version,
          cluster: e.depth,
          name: e.name,
          version: e.version,
          path: e.path,
        };
      }),
      edges: res.data.edges.map((e) => {
        return {
          source: e.from.toString(),
          target: e.to.toString(),
          info: e.info,
        };
      })
    }
    console.log(data.value)
  });
})

</script>

<template>
  <div class="container" ref="graphBox">
    <DependencyGraph :data="data" :width="width" :height="height"/>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>

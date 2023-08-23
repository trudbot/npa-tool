<script setup lang="ts">
import NodeInfoSideBar from "../NodeInfoSideBar/index.vue";
import DependencyGraph from "../DependencyGraph/index.vue"
import {computed, onMounted, shallowRef, watch} from "vue";
import {useDependencyData} from "../../stores/dependencyData.ts";
import {useRouter} from "vue-router";
import {useSelectedPackageData} from "../../stores/selectedPackageData.ts";

const dependencyDataStore = useDependencyData();
const router = useRouter();
const selectedPackageStore = useSelectedPackageData();

const props = defineProps<{
    id: string,
    depth: string
}>();

// 查看某个包的依赖
function viewPackageDependencies(id: number, depth: number) {
    router.push({
        name: "Dependencies",
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
})


</script>

<template>
    <div id="graph">
        <DependencyGraph :data="dependencyDataStore.graphData" :width="800" :height="800"
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

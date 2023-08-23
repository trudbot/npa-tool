import {defineStore} from "pinia";
import {GraphData} from "../apis/types/GraphData.ts";
import {computed, ref, shallowRef} from "vue";
import {getPackageDependencies} from "../apis/graphDependencies.ts";

export const useDependencyData = defineStore('dependencies', () => {
    const data = shallowRef<GraphData>();

    function setArgs(id: number, depth: number) {
        getPackageDependencies({id: id, depth: depth}).then(res => {
            data.value = res.data;
        });
    }

    const graphData = computed(() => {
        if (data.value === undefined) {
            return undefined;
        }
        return {
            nodes: data.value.nodes.map((e, idx) => {
                return {
                    id: e.id.toString(),
                    label: e.name + "@" + e.version,
                    cluster: e.depth,
                    name: e.name,
                    version: e.version,
                    path: e.path,
                };
            }),
            edges: data.value.edges.map((e) => {
                return {
                    source: e.from.toString(),
                    target: e.to.toString(),
                    info: e.info,
                };
            })
        }
    });

    return {data, graphData, setArgs};
})

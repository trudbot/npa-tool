import {defineStore} from "pinia";
import {GraphData} from "../apis/types/GraphData.ts";
import {computed, ref, shallowRef, watch} from "vue";
import {getPackageDependencies} from "../apis/graphDependencies.ts";

// 维护当前图的信息以及展示方式的状态
export const useDependencyData = defineStore('dependencies', () => {
    const data = shallowRef<GraphData>();
    const graph_id = ref<number>(0), graph_depth = ref<number>(-1);

    function setArgs(id: number, depth: number) {
        graph_id.value = id;
        graph_depth.value = depth;
        getPackageDependencies({id: id, depth: depth}).then(res => {
            data.value = res.data;
        });
    }

    function setId(id: number) {
        graph_id.value = id;
    }

    function setDepth(depth: number) {
        graph_depth.value = depth;
    }

    watch([graph_depth, graph_id], () => {
        getPackageDependencies({id: graph_id.value, depth: graph_depth.value}).then(res => {
            data.value = res.data;
        });
    }, {immediate: true});

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

    const packagesList = computed(() => {
        if (data.value === undefined) {
            return [];
        }
        return data.value.nodes.map(e => {
            return e.name + "@" + e.version;
        })
    });

    const licensesList = computed((): {licenseName: string, licenseNum: number}[] => {
        if (data.value === undefined) {
            return [];
        }
        const res: {licenseName: string, licenseNum: number}[] = [];
        for (let licenseName in data.value.licenses) {
            res.push({
                licenseName: licenseName,
                licenseNum: data.value.licenses[licenseName]
            })
        }
        return res;
    });

    const pieData = computed(() => {
        return licensesList.value.map(e => {
            return {
                type: e.licenseName,
                value: e.licenseNum
            }
        })
    })


    return {data, graphData, setArgs, packagesList, setId, setDepth, licensesList, pieData};
})

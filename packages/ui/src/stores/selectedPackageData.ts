import {defineStore} from "pinia";
import {ref, shallowRef, watch} from "vue";
import {PackageJson} from "../apis/types/PackageJson.ts";
import {getPackageData, getPackageDirectDependencies} from "../apis/graphDependencies.ts";

// 当前选择展示的包的状态
export const useSelectedPackageData = defineStore('selectedPackage', () => {
    const selectedId = ref(0);

    // 包的package.json信息
    const packageData = shallowRef<PackageJson>();
    // 包的直接依赖
    const dependencyList = ref<string[]>([]);
    const path = ref<string>("");
    function setSelected(id: number) {
        selectedId.value = id;
    }

    watch(selectedId, () => {
        getPackageData({id: selectedId.value}).then(res => {
            packageData.value = res.data.packageJson;
            path.value = res.data.path;
        })
        getPackageDirectDependencies({id: selectedId.value}).then(res => {
            dependencyList.value = res.data.list.map(e => {
                return e.name + "@" + e.version;
            })
        })
    }, {immediate: true})

    return {packageData, dependencyList, setSelected, path, selectedId};
})

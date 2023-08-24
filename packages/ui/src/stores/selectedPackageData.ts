import {defineStore} from "pinia";
import {computed, ref, shallowRef} from "vue";
import {PackageJson} from "../apis/types/PackageJson.ts";
import {getPackageData, getPackageDirectDependencies} from "../apis/graphDependencies.ts";

export const useSelectedPackageData = defineStore('selectedPackage', () => {
    const selectedId = ref(0);
    const packageData = shallowRef<PackageJson>();
    const dependencyList = ref<string[]>([]);
    const path = ref<string>("");
    function setSelected(id: number) {
        if (id !== selectedId.value) {
            selectedId.value = id;
            getPackageData({id: id}).then(res => {
                packageData.value = res.data.packageJson;
                path.value = res.data.path;
            })
            getPackageDirectDependencies({id: id}).then(res => {
                dependencyList.value = res.data.list.map(e => {
                    return e.name + "@" + e.version;
                })
            })
        }
    }

    return {packageData, dependencyList, setSelected, path, selectedId};
})

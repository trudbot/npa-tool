import {defineStore} from "pinia";
import {computed, ref, shallowRef} from "vue";
import {PackageJson} from "../apis/types/PackageJson.ts";
import {getPackageDirectDependencies, getPackageJson} from "../apis/graphDependencies.ts";

export const useSelectedPackageData = defineStore('selectedPackage', () => {
    let selectedId = 0;
    const packageData = shallowRef<PackageJson>();
    const dependencyList = ref<string[]>([]);
    function setSelected(id: number) {
        if (id !== selectedId) {
            selectedId = id;
            getPackageJson({id: id}).then(res => {
                packageData.value = res.data;
            })
            getPackageDirectDependencies({id: id}).then(res => {
                dependencyList.value = res.data.data.map(e => {
                    return e.name + "@" + e.id;
                })
            })
        }
    }

    return {packageData, dependencyList, setSelected};
})

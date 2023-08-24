<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import GraphModule from './GraphModule.vue'
import {useSelectedPackageData} from "../../../stores/selectedPackageData.ts";
import {useRouter} from "vue-router";
const selectedPackageStore = useSelectedPackageData();
const router = useRouter();

const name = computed(() => {
    if (selectedPackageStore.packageData) {
        return selectedPackageStore.packageData.name;
    }
    return '';
});

const version = computed(() => {
    if (selectedPackageStore.packageData) {
        return selectedPackageStore.packageData.version;
    }
    return '';
});


const description = computed(() => {
    if (selectedPackageStore.packageData && selectedPackageStore.packageData.description) {
        return selectedPackageStore.packageData.description;
    }
    return '';
})
const moduleHref = computed(() => {
    if (selectedPackageStore.packageData && selectedPackageStore.packageData.homepage) {
        return selectedPackageStore.packageData.homepage;
    }
})


// const nodeInfo  = ref()

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
])

// onMounted(()=>{
//     const {packageData, dependencyList, setSelected} = useSelectedPackageData()
//     nodeInfo.value = packageData.value
// })

function showDependencies(){
  router.push({
    name: "Graph",
    params: {
      id: selectedPackageStore.selectedId,
      depth: -1
    }
  });
}

function showBeDependentOn(){
    //展示被依赖
}

</script>

<template>
    <section class="moduleInfo">
        <div class="infoTop">
            <svg t="1692715551171" class="icon infoSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="7222" width="200" height="200">
            <path d="M512.50142 958.397886c-119.320573 0-231.499491-46.465265-315.871087-130.837884C112.258737
            743.188406 65.792449 631.010511 65.792449 511.688915c0-119.319549 46.466288-231.499491
            130.837884-315.871087C281.002952 111.445208 393.180847 64.979944 512.50142 64.979944s231.499491
            46.465265 315.871087 130.837884c84.372619 84.372619 130.837884 196.551538 130.837884 315.871087 0
            119.321596-46.465265 231.499491-130.837884 315.871087C744.000911 911.932622 631.821993 958.397886
            512.50142 958.397886zM512.50142 105.962334c-223.718271 0-405.726581 182.00831-405.726581 405.726581s182.00831
            405.726581 405.726581 405.726581c223.718271 0 405.727605-182.00831 405.727605-405.726581S736.220714 105.962334
            512.50142 105.962334z" fill="#70c7f6" p-id="7223"></path><path d="M510.150886 775.953647c-18.107403
            0-32.745798-14.678304-32.745798-32.785707L477.405087 452.191846c0-18.108426 14.638395-32.785707 32.745798-32.785707
            18.107403 0 32.745798 14.678304 32.745798 32.785707l0 290.976094C542.896684 761.275343 528.258289 775.953647
            510.150886 775.953647z" fill="#70c7f6" p-id="7224"></path><path d="M511.357364 296.458969m-45.080731 0a44.054
            44.054 0 1 0 90.161463 0 44.054 44.054 0 1 0-90.161463 0Z" fill="#70c7f6" p-id="7225"></path></svg>

            <span> {{name}}</span>
            <div class="githubLink">
                <svg t="1692718071808" class="icon githubSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="8794" width="200" height="200"><path d="M512 0C229.283787 0 0.142041 234.942803 0.142041 524.867683c0
                231.829001 146.647305 428.553077 350.068189 497.952484 25.592898 4.819996 34.976961-11.38884 34.976961-25.294314
                0-12.45521-0.469203-45.470049-0.725133-89.276559-142.381822
                31.735193-172.453477-70.380469-172.453477-70.380469-23.246882-60.569859-56.816233-76.693384-56.816234-76.693385-46.493765-32.58829
                3.540351-31.948468 3.540351-31.948467 51.356415 3.71097 78.356923 54.086324 78.356923 54.086324 45.683323 80.19108 119.817417
                57.072162 148.993321 43.593236 4.649376-33.91059 17.915029-57.029508
                32.50298-70.167195-113.675122-13.222997-233.151301-58.223843-233.1513-259.341366 0-57.285437 19.919806-104.163095
                52.678715-140.846248-5.246544-13.265652-22.820334-66.626844 4.990615-138.884127 0 0 42.996069-14.076094 140.760939
                53.787741 40.863327-11.644769 84.627183-17.445825 128.177764-17.6591 43.465272 0.213274 87.271782 6.014331 128.135109
                17.6591 97.679561-67.906489 140.59032-53.787741 140.59032-53.787741 27.938914 72.257282 10.407779 125.618474 5.118579
                138.884127 32.844219 36.683154 52.593405 83.560812 52.593405 140.846248 0 201.586726-119.646798 245.990404-233.663158
                258.957473 18.341577 16.208835 34.721032 48.199958 34.721032 97.210357 0 70.167195-0.639822 126.7275-0.639823 143.960051
                0 14.033439 9.213443 30.370239 35.190235 25.209005 203.250265-69.527373 349.769606-266.123484 349.769605-497.867175C1023.857959
                234.942803 794.673558 0 512 0" fill="#3E75C3" p-id="8795"></path></svg>

                <el-link :href="moduleHref" target="_blank" type="primary" :underline="false">Link of Github</el-link>
            </div>
        </div>
        <div class="mainInfo">
            <el-col :span="24"></el-col>
            <el-tag type="info" effect="plain" :color="colors[Math.floor(Math.random() * 9)]">Version : {{ version }}</el-tag>
            <el-tag type="info" effect="plain" :color="colors[Math.floor(Math.random() * 9)]">Path of the module:<br><br>{{ selectedPackageStore.path }}</el-tag>
            <el-tag type="info" :color="colors[Math.floor(Math.random() * 9)]">Description of the module :<br><br>{{ description }}</el-tag>
        </div>
        <div class="dependencies">
            <GraphModule module-name="Dependencies :" :modules-arr="selectedPackageStore.dependencyList" />
        </div>
        <el-button @click="showDependencies" type="primary"  round plain>Dependencies</el-button>
        <el-button @click="showBeDependentOn" type="primary"  round plain>Be dependent on</el-button>
    </section>
</template>

<style scoped lang="less">

.moduleInfo {
    width: inherit;
    height: 72vh;

    .infoTop {
        width: inherit;
        height: 40px;
        border-bottom: 3px solid rgb(188,233,232);
    }
    .infoTop>span {
        text-align: center;
        line-height: 43px;
        font-size: 15px;
        font-weight: 700;
    }
    .infoTop .infoSvg {
        float: left;
        width: 22px;
        height: 22px;
        color: #5ff2ff;
        padding: 11px 5px 0 10px;
    }
    .infoTop .githubLink {
        display: inline-block;
        width: 150px;
        margin-left: 50px;
    }
    .infoTop .githubSvg {
        float: left;
        width: 22px;
        height: 22px;
        padding: 1px 5px 0 0;
    }
    .infoTop>.el-link {
        float: right;
        line-height: 43px;
    }
    .el-tag {
        width: 350px;
        height: 40px;
        margin: 10px 0 10px 10px;
        font-size: 14px;
        font-weight: 600;
        color: #484848;
    }
    .mainInfo :nth-child(n+3) {
        height: 80px;
        overflow-wrap: break-word;
        word-break: break-all;
        word-wrap: break-word;
    }
    .mainInfo {
        border-bottom: 3px solid rgb(188,233,232);
    }

    .el-button {
        margin: 10px 10px 0 35px;
    }
}
</style>

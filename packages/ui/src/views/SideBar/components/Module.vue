<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {useSelectedPackageData} from "../../../stores/selectedPackageData.ts";
import {useRouter} from "vue-router";
import {Folder,Link,InfoFilled,FolderOpened,Document} from '@element-plus/icons-vue'

const selectedPackageStore = useSelectedPackageData();
const router = useRouter();

const name = computed(() => {
    if (selectedPackageStore.packageData) {
        return selectedPackageStore.packageData.name;
    }
    return '(module not selected)';
});

const version = computed(() => {
    if (selectedPackageStore.packageData) {
        return selectedPackageStore.packageData.version;
    }
    return '0.0.0';
});


const description = computed(() => {
    if (selectedPackageStore.packageData && selectedPackageStore.packageData.description) {
        return selectedPackageStore.packageData.description;
    }
    return 'Description of the module';
})

const path = computed(()=>{
    if (selectedPackageStore.path) {
        return selectedPackageStore.path;
    }
    return '../node_modules'
})

const moduleHref = computed(() => {
    if (selectedPackageStore.packageData && selectedPackageStore.packageData.homepage) {
        return selectedPackageStore.packageData.homepage;
    }
    return 'https://github.com/';
})

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

</script>

<template>
  <div class="module">
    <div class="main-info">
            <ul>
                <li :style="{background:colors[Math.floor(Math.random() * 9)]}">
                    <el-icon><Folder /></el-icon>
                    <el-popover
                    placement="top-start"
                    title="Module"
                    :width="200"
                    trigger="hover"
                    :content="name">
                        <template #reference>
                            <el-text class="module-name" truncated>{{ name }}</el-text>
                        </template>
                    </el-popover>
                    <el-icon class="link icon"><Link /></el-icon>
                    <el-link :href="moduleHref" target="_blank" type="primary" :underline="false">Link of Github</el-link>
                </li>
                <li :style="{background:colors[Math.floor(Math.random() * 9)]}">
                    <el-icon class="icon"><InfoFilled /></el-icon>
                    <el-text class="module-text">version: {{ version }}</el-text>
                </li>
                <li :style="{background:colors[Math.floor(Math.random() * 9)]}">
                    <el-icon class="icon"><FolderOpened /></el-icon>
                    <el-text class="module-text" >path: {{ path }}</el-text>
                </li>
                <li :style="{background:colors[Math.floor(Math.random() * 9)]}">
                    <el-icon class="icon"><Document /></el-icon>
                    <el-text class="module-text" >description: {{ description }}</el-text>
                </li>
            </ul>
        </div>
  </div>
</template>

<style scoped lang="less">
.module {
  .main-info {
        padding: 2% 2% 1% 2%;
        ul>li {
            font-weight: 548;
        }
        ul>li:nth-child(-n+3) {
            margin-bottom: 6%;
        }
        .module-name {
            width: 46%;
            line-height: 100%;
            margin: 0 0 0 2%;
            color: #000;
        }
        .module-text {
            width: 90%;
            line-height: 100%;
            margin: 0 0 0 2%;
            color: #000;
        }
        .icon {
            vertical-align: middle;
        }
        .el-link {
            margin-left: 1%;
            vertical-align: bottom;
            font-weight: 548;
        }
        .link {
            color: rgb(94, 180, 237);
        }
    }
    .el-button {
            width: 40%;
            margin: 2% 5% 0 5%;
        }
}
</style>

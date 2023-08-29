<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useSelectedPackageData } from "../../../stores/selectedPackageData.ts";
import { useRouter } from "vue-router";
import { Folder, Link, InfoFilled, FolderOpened, Document } from "@element-plus/icons-vue";

const selectedPackageStore = useSelectedPackageData();
const router = useRouter();

const name = computed(() => {
    if (selectedPackageStore.packageData) {
        return selectedPackageStore.packageData.name;
    }
    return "(module not selected)";
});

const version = computed(() => {
    if (selectedPackageStore.packageData) {
        return selectedPackageStore.packageData.version;
    }
    return "0.0.0";
});

const description = computed(() => {
    if (selectedPackageStore.packageData && selectedPackageStore.packageData.description) {
        return selectedPackageStore.packageData.description;
    }
    return "Description of the module";
});

const path = computed(() => {
    if (selectedPackageStore.path) {
        return selectedPackageStore.path;
    }
    return "../node_modules";
});

const moduleHref = computed(() => {
    if (selectedPackageStore.packageData && selectedPackageStore.packageData.homepage) {
        return selectedPackageStore.packageData.homepage;
    }
    return "https://github.com/";
});

// const colors = ref([
//     "#BDD2FD",
//     "#BDEFDB",
//     "#C2C8D5",
//     "#FBE5A2",
//     "#F6C3B7",
//     "#B6E3F5",
//     "#D3C6EA",
//     "#FFD8B8",
//     "#AAD8D8",
//     "#FFD6E7",
// ]);

// onMounted(()=>{

// })

function showDependencies() {
    router.push({
        name: "Graph",
        params: {
            id: selectedPackageStore.selectedId,
            depth: -1,
        },
    });
}
</script>

<template>
    <div class="module">
        <div class="main-info">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>节点信息</span>
                        <el-link :href="moduleHref" target="_blank" type="primary" :underline="false"
                            ><el-icon class="link+ icon"><Link /></el-icon>Link of Github</el-link
                        >
                    </div>
                </template>
                <ul>
                    <li>
                        <el-popover placement="right" title="Module" :width="200" trigger="hover" :content="name">
                            <template #reference>
                                <el-text class="module-name" truncated
                                    ><el-icon color="#409EFC"><Folder /></el-icon> {{ name }}</el-text
                                >
                            </template>
                        </el-popover>
                    </li>
                    <li>
                        <el-text class="module-text"
                            ><el-icon color="#409EFC"><InfoFilled /></el-icon> version: {{ version }}</el-text
                        >
                    </li>
                    <li>
                        <el-text class="module-text"
                            ><el-icon color="#409EFC"><FolderOpened /></el-icon> path: {{ path }}</el-text
                        >
                    </li>
                    <li :style="{ display: 'flex', justifyContent: 'space-around' }">
                        <el-button>依赖图</el-button>
                        <el-button>安装源</el-button>
                    </li>
                </ul>
            </el-card>
        </div>
    </div>
</template>

<style scoped lang="less">
.module {
    .main-info {
        padding: 0 2% 1% 2%;
        .box-card {
            width: 100%;
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            ul {
                li {
                    margin-bottom: 18px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    .el-button {
                        width: 40%;
                    }
                }
            }
        }
    }
}
</style>

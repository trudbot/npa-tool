<script setup lang="ts">
import {computed} from "vue";
import {useSelectedPackageData} from "../../../stores/selectedPackageData.ts";
import {useRouter} from "vue-router";
import {Folder, Link, InfoFilled, FolderOpened} from "@element-plus/icons-vue";
import GraphModule from "./GraphModule.vue";

const selectedPackageStore = useSelectedPackageData();
const router = useRouter();
const defaultDepthLimit = parseInt(import.meta.env.VITE_DEPTH_LIMIT);

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

// const description = computed(() => {
//   if (selectedPackageStore.packageData && selectedPackageStore.packageData.description) {
//     return selectedPackageStore.packageData.description;
//   }
//   return "Description of the module";
// });

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

function showDependencies() {
  router.push({
    name: "Graph",
    params: {
      id: selectedPackageStore.selectedId,
      depth: defaultDepthLimit,
    },
  });
}

function whyInstall() {
  router.push({
    name: "Why",
    params: {
      id: selectedPackageStore.selectedId
    }
  })
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
            >
              <el-icon class="link+ icon">
                <Link/>
              </el-icon>
              Link of Github
            </el-link
            >
          </div>
        </template>
        <ul>
          <li>
            <el-popover placement="right" title="Module" :width="200" trigger="hover" :content="name">
              <template #reference>
                <el-text class="module-name" truncated
                >
                  <el-icon color="#409EFC">
                    <Folder/>
                  </el-icon>
                  {{ name }}
                </el-text
                >
              </template>
            </el-popover>
          </li>
          <li>
            <el-text class="module-text"
            >
              <el-icon color="#409EFC">
                <InfoFilled/>
              </el-icon>
              version: {{ version }}
            </el-text
            >
          </li>
          <li>
            <el-text class="module-text"
            >
              <el-icon color="#409EFC">
                <FolderOpened/>
              </el-icon>
              path: {{ path }}
            </el-text
            >
          </li>
          <li :style="{ display: 'flex', justifyContent: 'space-around' }">
            <el-button @click="showDependencies">graph</el-button>
            <el-button @click="whyInstall">why install it?</el-button>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="dependencies">
      <el-collapse accordion class="dependency-collapse">
        <el-collapse-item>
          <template #title>
            <div class="item-title">{{ selectedPackageStore.dependencyList.length + ' dependencies' }}</div>
          </template>
          <template #default>
            <el-scrollbar max-height="50vh">
              <GraphModule :modules-arr="selectedPackageStore.dependencyList"/>
            </el-scrollbar>
          </template>
        </el-collapse-item>
      </el-collapse>
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

.dependencies {
  padding: 10px;
}
</style>

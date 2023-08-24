<script setup lang="ts">
import NodeInfoSideBar from "../NodeInfoSideBar/index.vue";
import DependencyGraph from "../DependencyGraph/index.vue"
import {computed, onMounted, ref, shallowRef, watch} from "vue";
import {useDependencyData} from "../../stores/dependencyData.ts";
import {useRouter} from "vue-router";
import {useSelectedPackageData} from "../../stores/selectedPackageData.ts";
import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";

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
    name: "Graph",
    params: {
      id: id,
      depth: depth
    }
  })
}

// 容器大小监听
const graphBox = ref(null);
const width = ref(1000);
const height = ref(800);

function loadNewSize() {
  const container = graphBox.value;
  if (!container || !container.clientWidth || !container.clientHeight) return;
  width.value = container.clientWidth;
  height.value = container.clientHeight;
}

// 两栏拖拽布局
const drag = ref(null);

// 侧栏宽度配置
const defaultSidebarWidth = 300;
const maxSidebarWidth = 400;
// 侧栏的宽度
const sidebarWidth = ref(defaultSidebarWidth);

function move(px: number) {
  const updated = Math.min(maxSidebarWidth, sidebarWidth.value + px);
  width.value += sidebarWidth.value - updated;
  sidebarWidth.value = updated;
}

// 侧栏折叠
// 为什么强行用move?
// 将sidebarWidth的变化都集中到一处
// 方便在改变时同步去改变canvas的大小
function fold() {
  if (sidebarWidth.value > 0) {
    move(-1 * sidebarWidth.value);
  } else {
    move(defaultSidebarWidth - sidebarWidth.value);
  }
}

// 鼠标监听事件
function bindDrop() {
  drag.value.onmousedown = (e) => {
    document.onmousemove = (e) => {
      move(-1 * e.movementX)
      if (sidebarWidth.value <= 20) {
        document.onmouseup();
        fold();
      }
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
    }
    return false;
  }
}

onMounted(() => {
  bindDrop()
  watch([() => props.id, () => props.depth], () => {
    dependencyDataStore.setArgs(parseInt(props.id), parseInt(props.depth));
  }, {immediate: true});


  // 监听图容器变化
  // 两种引起变化的原因
  loadNewSize();

  // window大小被用户改变
  window.addEventListener("resize", () => {
    loadNewSize();
  });
})
</script>

<template>
  <div class="container">

    <div class="main" ref="graphBox">
      <DependencyGraph :data="dependencyDataStore.graphData" :width="width" :height="height"
                       @nodeDBClick="nodeID => viewPackageDependencies(nodeID, -1)"
                       @nodeClick="nodeId => selectedPackageStore.setSelected(nodeId)"
      >
      </DependencyGraph>
    </div>
    <div class="line" ref="drag"
         :style="{cursor: sidebarWidth === 0 ? '' : 'col-resize'}">
      <el-button
          class="line-button"
          circle
          :size="'large'"
          :icon="sidebarWidth === 0 ? ArrowLeft : ArrowRight"
          @click="fold"
      >
      </el-button>
    </div>
    <div class="sidebar-container" :style="{width: sidebarWidth + 'px'}">
      <div class="sidebar-content"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;

  .sidebar-container {
    height: 100%;
    overflow: hidden;
  }

  .line {
    width: 4px;
    height: 100%;
    position: relative;
    border-right: 1px solid #e6e6e6;

    .line-button {
      position: absolute;
      top: 50%;
      right: -20px;
    }
  }

  .main {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
}

</style>

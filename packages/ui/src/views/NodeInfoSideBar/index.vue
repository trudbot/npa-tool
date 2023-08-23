<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {ref} from 'vue'
import animate from '../../utils/animate'
import NodeModule from "./components/NodeModule.vue";
import NodeGraph from "./components/NodeGraph.vue";
import {useRouter} from "vue-router";

const sideBarRef = ref()
const hideRef = ref()
const moduleRef = ref()
const graphRef = ref()
const hide = ref(false)
const searchInput = ref('')
const router = useRouter();

function hideSideBar() {
  if (hide.value === false) {
    animate(sideBarRef.value, 1675, () => {
      hideRef.value.innerHTML = '<'
    });

  } else {
    animate(sideBarRef.value, 1302, () => {
      hideRef.value.innerHTML = '>'
    });
  }
  hide.value = !hide.value
}

function toModule() {
  router.push({
    name: "Module"
  })
  moduleRef.value.style.backgroundColor = 'rgb(189,211,253)'
  graphRef.value.style.backgroundColor = ''
}

function toGraph() {
  router.push({
    name: "Graph"
  })
  graphRef.value.style.backgroundColor = 'rgb(189,211,253)'
  moduleRef.value.style.backgroundColor = ''
}

function searchModule() {
  //搜索module
  console.log(searchInput.value);

}
</script>

<template>
  <div class="sideBar" ref="sideBarRef">
    <nav class="nav">
      <ul>
        <el-popover
            placement="top-start"
            :title="!hide?'Retract':'Expand'"
            width="150"
            trigger="hover"
        >
          <template #reference>
            <li class="hide" ref="hideRef" @click="hideSideBar">></li>
          </template>
        </el-popover>
        <li @click="toModule" ref="moduleRef">Module</li>
        <li @click="toGraph" ref="graphRef">Graph</li>
        <li class="search" @click="searchModule">
          <el-input size="small" placeholder="Please input" v-model="searchInput"/>
          <el-button :icon="Search" size="small" color="" circle/>
        </li>
      </ul>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">

.sideBar {
  position: absolute;
  right: 0;
  width: 390px;

  .nav {
    width: inherit;
    height: 36px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    background: linear-gradient(to right, rgb(189, 239, 219), rgb(183, 227, 245));

    ul > li {
      display: inline-block;
      margin-right: 10px;
      line-height: 36px;
      font-weight: 1000;
      color: rgb(111, 153, 249);
      background: linear-gradient(to right, #85fff3, #39bef8) no-repeat right bottom;
      background-size: 0 3px;
      transition: background-size 300ms;
    }

    ul > li:nth-child(-n+3):hover {
      background-position-x: left;
      background-size: 100% 4px;
      cursor: pointer;
    }

    ul > .hide {
      height: 24px;
      line-height: 20px;
      margin: 0 2px 0 2px;
    }

    ul > .search:hover {

    }

    .search > .el-input {
      width: 200px;
      margin-right: 5px;
      margin-bottom: 2px;
    }

    .search > .el-button {
      margin-bottom: 2px;
    }
  }

  .content {
    width: 374px;
    max-height: 80vh;
    margin-left: 8px;
    border-left: 6px solid rgb(188, 233, 232);
    border-bottom: 6px solid rgb(188, 233, 232);
    background-color: rgb(247, 247, 247);
    overflow-x: scroll;
    overflow-x: hidden;
  }
}
</style>

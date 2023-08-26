<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import NodeModule from './components/NodeModule.vue';
import NodeGraph from './components/NodeGraph.vue';
</script>

<template>
    <el-container>
          <el-header>
            <el-menu
            default-active="1"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false">
              <el-menu-item index="1">Module</el-menu-item>
              <el-menu-item index="2">Graph</el-menu-item>
              <el-menu-item class="search">
                <el-input size="small" placeholder="Please input"/>
                <el-icon><Search /></el-icon>
              </el-menu-item> 
            </el-menu>
          </el-header>
          <el-main>
            <NodeModule />
            <!-- <NodeGraph /> -->
          </el-main>
        </el-container>
</template>

<style scoped lang="less">
.el-container {
    .el-header, .el-main {
      padding: 0;
    }
    .el-header {
      height: 45px;
    }
    .el-menu {
      height: 45px;
      .el-menu-item:nth-child(-n+2) {
        width: 20%;
        font-size: 16px;
      }
      .search {
        padding: 0;
        width: 60%;
      }
      .search:hover,.search:focus {
        background-color: rgb(255,255,255);
      }
      .el-input {
        width: 80%;
        margin-right: 2%;
      }
    }
}
</style>
<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps({
    modulesArr: Array<string>,
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

</script>

<template>
    <div class="modules">
             <ul>
                <li v-for="(item, index) in props.modulesArr" :key="index" :style="{background:colors[Math.floor(Math.random() * 9)]}">
                    <el-popover
                    placement="top-start"
                    title="module"
                    :width="200"
                    trigger="hover"
                    :content="item">
                        <template #reference>
                            <el-text class="dependencies" truncated> {{ item }}</el-text>
                        </template>
                    </el-popover>
                </li>
             </ul>
        </div>
</template>

<style scoped lang="less">
.modules {
    
    .dependencies {
        color: #000;
        font-size: 14px;
        font-weight: 545;
        vertical-align: middle;
        padding-left: 2px;
        font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    }
    ul {
        padding-left: 1%;
    }
    ul>li {
        display: inline-block;
        width: 25%;
        margin: 2%;
        border-radius: 15px;
    }
}
</style>

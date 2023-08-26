<script setup lang="ts">
import {ref} from 'vue'
import {CaretRight} from '@element-plus/icons-vue'
const props = defineProps({
    moduleName: String,
    modulesArr: Array<String>,
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

const isShow = ref(false)

function showModules(){
    isShow.value = !isShow.value
}

</script>

<template>
        <div class="modules">
            <el-icon :class="isShow?'show':''" @click="showModules"><CaretRight /></el-icon>
            <el-text class="dependencies">{{ props.moduleName }}</el-text>
            <div v-show="isShow">
                 <ul>
                    <li v-for="item in props.modulesArr" :style="{background:colors[Math.floor(Math.random() * 9)]}">
                        <el-popover
                        placement="top-start"
                        title="Dependency"
                        :width="180"
                        trigger="hover"
                        :content="item">
                            <template #reference>
                                <el-text class="dependencies" truncated> {{ item }}</el-text>
                            </template>
                        </el-popover>
                    </li>
                 </ul>
            </div>
        </div>
</template>

<style scoped lang="less">
.modules {
    max-height: 30%;
    border-bottom: 2px solid rgb(188,233,232);
    .dependencies {
        color: #000;
        font-size: 15px;
        line-height: 100%;
    }
    div {
        max-height: 30vh;
        overflow-x: scroll;
    }
    ul {
        padding-left: 1%;
    }
    ul>li {
        display: inline-block;
        width: 30%;
        margin: 2% 3% 2% 0;
        border-radius: 15px;
    }
}
.show {
    transform: rotate(90deg);
    transform-origin: 50% 50%;
    transition: all 0.5ms;
}
</style>

<script setup lang="ts">
import {light as colors} from "../../../assets/colorSystem.ts";

const props = defineProps({
    modulesArr: Array<string>,
})
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
        color: #4f4f4f;
        font-size: 14px;
        font-weight: 545;
        vertical-align: middle;
        font-family: monospace;
    }
    ul {
        padding-left: 1%;
    }
    ul>li {
        text-align: center;
        display: inline-block;
        width: 25%;
        margin: 2%;
        border-radius: 15px;
        padding-left: 4px;
        padding-right: 4px;
    }
}
</style>

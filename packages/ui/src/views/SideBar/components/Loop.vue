<script setup lang="ts">
import {ref} from 'vue'

const loopStatus = ref('exist')

function showLoop(){
    //显示环
}
</script>

<template>
<div class="loop-container">
    <h3>Loop</h3><br>
    <el-text :class="loopStatus==='exist'?'exist':'none'">Is there a loop in this module : {{ loopStatus }}</el-text>
    <el-button @click="showLoop" :type="loopStatus==='exist'?'primary':'info'" :disabled="loopStatus==='exist'?false:true" round plain >show the loop</el-button>
</div>
</template>

<style scoped lang="less">
.loop-container {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    border-top: 1px solid rgb(155,155,155);
    margin-top: 20%;
    h3 {
        color: rgb(179,179,179);
        
    }
    .el-text {
        display: block;
        height: 25px;
        line-height: 25px;
        margin: 10% auto 0;
        font-size: 15px;
        text-align: center;
    }
    .el-button {
        display: block;
        margin: 10% auto 0;
    }
    .none {
        background-color: rgb(244,244,245);
        border: 1px solid rgb(200,201,204);
        color: rgb(144,147,153);
    }
    .exist {
        background-color: rgb(244,244,245);
        border: 1px solid rgb(164,207,254);
        color: rgb(83,160,253);
    }
}
</style>
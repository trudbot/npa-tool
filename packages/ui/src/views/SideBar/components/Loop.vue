<script setup lang="ts">
import {ref} from 'vue'

const loopStatus = ref('not exist')

function showLoop(){
    //显示环
}
</script>

<template>
<div class="loop-container">
    <h3>Circular Dependency</h3><br>
    <div class="loop-mes">
        <el-text :class="loopStatus==='exist'?'exist':'none'">status : {{ loopStatus }}</el-text>
        <el-button @click="showLoop" :type="loopStatus==='exist'?'primary':'info'" 
        :disabled="loopStatus==='exist'?false:true" round plain >show the loop</el-button>
    </div>
</div>
</template>

<style scoped lang="less">
.loop-container {
    width: 84%;
    margin-left: 8%;
    margin-right: 8%;
    // border-top: 1px solid rgb(155,155,155);
    margin-top: 20%;
    padding: 0 0 10% 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.05),
    0 8px 8px rgba(0, 0, 0, 0.05), 0 16px 16px rgba(0, 0, 0, 0.05);
    h3 {
        width: 58%;
        color: rgb(179,179,179);
        // background: linear-gradient(to right, #ec695c,#61c454) no-repeat right bottom;
        background: linear-gradient(to right, #BDD2FD,#FFD6E7) no-repeat right bottom;
        background-size: 0 2px;
        transition: background-size 1300ms;
        padding: 0;
        margin: 2%;
    }
    h3:hover {
        background-position-x: left;
        background-size: 100% 2px;
    }
    .loop-mes {
        width: 90%;
        margin: auto;
    }
    .el-text {
        display: inline-block;
        width: 50%;
        height: 25px;
        line-height: 25px;
        font-size: 15px;
        text-align: center;
        margin-right: 8%;
    }
    .el-button {
        display: inline-block;
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
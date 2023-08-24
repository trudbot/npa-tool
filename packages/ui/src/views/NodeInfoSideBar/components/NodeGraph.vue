<script setup lang="ts">
import {ref} from 'vue'
import GraphModule from './GraphModule.vue'
import {useDependencyData} from '../../../stores/dependencyData.ts'

const modulesArr = ref(['xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx'])
const licensesArr = ref(['xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx','xxx'
                        ,'xxx','xxx','xxx','xxx','xxx','xxx','xxx'])
const loopMes = ref('exist')
const DependencyDataStore = useDependencyData();
function showLoop(){
    //显示环
}
</script>

<template>
    <div class="graph">
        <GraphModule module-name="Modules :" :modules-arr="DependencyDataStore.packagesList" />
        <GraphModule module-name="Licenses :" :modules-arr="licensesArr" />
        <section class="closedLoop">
            <h4>ClosedLoop :</h4>
            <el-tag
                class="mx-1"
                effect="light"
                :type="loopMes?'success':'info'"
                round>
                {{ loopMes }}
            </el-tag>
            <el-button @click="showLoop" type="primary" :disabled="loopMes?false:true" round plain>click to show the loop</el-button>
        </section>
    </div>
</template>

<style scoped lang="less">
.graph {
    width: inherit;

    .el-tag {
        width: 100px;
        height: 25px;
        margin: 10px;
    }
    .closedLoop {
        min-height: 10vh;
    }
}
</style>

<script setup lang="ts">
import {ref} from 'vue'

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
        <section class="modules">
            <svg @click="showModules" :class="isShow?'show':''" t="1692712125499" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" 
            p-id="5313" width="200" height="200"><path d="M288.791335 65.582671l446.41733 446.417329-446.41733 446.417329z" 
            p-id="5314"></path></svg>
            <h4>{{props.moduleName }}</h4>
            <div v-show="isShow">
                <el-tag
                    v-for="item in props.modulesArr"
                    class="mx-1"
                    effect="dark"
                    :color="colors[Math.floor(Math.random() * 9)]"
                    round>
                    {{ item }}
                 </el-tag>
            </div>
        </section>
</template>

<style scoped lang="less">
.modules {
    min-height: 30vh;
    border-bottom: 3px solid rgb(188,233,232);
}
.modules>div {
    max-height: 30vh;
    overflow-x: scroll;
    
}
.modules>svg {
    float: left;
    margin-top: 2px;
    width: 20px;
    height: 20px;
}
.show {
    transform: rotate(90deg);
    transform-origin: 50% 50%;
    transition: all 0.5ms;
}
.el-tag {
    width: 100px;
    height: 25px;
    margin: 8px;
}
</style>

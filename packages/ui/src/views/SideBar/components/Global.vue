<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {ref, watch} from 'vue'
import { searchPackage } from '../../../apis/searchPackage';
import { PackageInfo } from '../../../apis/types/PackageJson';

const searchInput = ref('')

watch(searchInput, (newInput, oldInput) => {
    if (newInput !== '') {
         searchPackage({pattern:newInput}).then((res)=>{
            console.log(res.data.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
})

function selectModule(){
    
}

</script>

<template>
    <div class="global">
        <div class="search">
            <el-input size="small" placeholder="Please input" v-model="searchInput" />
            <el-icon><Search /></el-icon>
            <div class="searchRes">
                <ul>
                    <li @click="selectModule"></li>
                </ul>
            </div>
        </div>
        <div class="loop">
        </div>
    </div>
</template>

<style scoped lang="less">
.global {
    .search {
        width: 60%;
        margin: 0 auto;
        .el-input  {
            width: 90%;
            margin-left: 3%;
        }
        .el-icon {
            vertical-align: middle;
        }
    }
}
</style>

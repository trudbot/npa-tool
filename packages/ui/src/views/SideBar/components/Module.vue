<script setup lang="ts">
import {ref} from "vue";

const packageName = ref("npa-tool")
const version = ref("1.0.0")
const description = ref("afbsdanaa");

</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div>
          <div>
            <div class="package-name">{{ packageName }}</div>
            <div class="package-description">{{ description }}</div>
          </div>
          <div class="package-version">{{version}}</div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<style scoped lang="less">

</style>

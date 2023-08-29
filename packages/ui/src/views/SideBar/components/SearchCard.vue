<script setup lang="ts">
import {computed, onMounted, ref, shallowRef, watch} from "vue";
import {PackageInfo} from "../../../apis/types/PackageJson.ts";
import {searchPackage} from "../../../apis/searchPackage.ts";
import {dark} from "../../../assets/colorSystem.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const pattern = ref<string>("");
const data = shallowRef([]);
const renderData = computed(() => {
  const color = new Map<string, number>();
  let idx = 0;
  return data.value.map((e) => {
    let itemColor;
    if (color.has(e.item.name)) {
      itemColor = color.get(e.item.name);
    } else {
      color.set(e.item.name, idx);
      itemColor = idx;
      idx++;
    }
    return {
      info: e.item,
      color: dark[itemColor % 10]
    }
  })
})

watch(pattern, () => {
  searchPackage({pattern: pattern.value}).then(res => {
    data.value = res.data.data;
  })
})

function viewPackage(id: number) {
  router.push({
    name: "Module",
    params: {
      id: id,
      depth: -1
    }
  })
}

</script>

<template>
  <div class="search-card">
    <div class="input-container">
      <div class="form__group field">
        <input type="text" class="form__field" placeholder="Name" name="name" id='name' required v-model="pattern"/>
        <label for="name" class="form__label">Search packages</label>
      </div>
    </div>
    <div class="data">
      <el-scrollbar max-height="30vh">
        <div v-for="(packageItem, index) in renderData" class="package" :key="index">
          <div class="package-info" :style="{background: packageItem.color}" @click="viewPackage(packageItem.info.id)">
            <el-popover
                        placement="top-start"
                        :title="packageItem.info.name + '@' + packageItem.info.version"
                        :width="320"
                        trigger="hover"
                        :content="packageItem.info.path">
                            <template #reference>
                              <el-text class="text" truncated>{{ packageItem.info.name + "@" + packageItem.info.version }}</el-text>
                            </template>
                        </el-popover>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="less">

.search-card {

  .input-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .package {
    height: 10%;
    width: 80%;
    padding-left: 5%;
    padding-right: 5%;
    margin: auto;

    .package-info {
      height: 100%;
      margin-top:5%;
      color: white;
      border-radius: 1vw;
      // padding:0 0 4px 0;
      
      .el-text {
        height: 28px;
        line-height: 28px;
        vertical-align: middle;
        margin: auto;
      }

      &:hover {
        cursor: pointer;
      }

      .text {
        color: white;
        display: block;
        text-align: center;
      }
    }
  }

}


@primary: #11998e;
@secondary: #38ef7d;
@white: #fff;
@gray: #9b9b9b;
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 80%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid @gray;
  outline: 0;
  font-size: 1.3rem;
  color: @gray;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: @gray;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: @primary;
    font-weight: 700;
  }

  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, @primary, @secondary);
  border-image-slice: 1;
}

/* reset input */
.form__field {
  &:required, &:invalid {
    box-shadow: none;
  }
}
</style>

<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {useSlider} from "../../Composables/animationSlider.ts";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

const router = useRouter();

// 菜单项
const menuItem = [
  {
    text: "Module",
    color: "#5B8FF9",
    route: "Module"
  },
  {
    text: "Graph",
    color: "#E8684A",
    route: "Graph"
  },
  {
    text: "Global",
    color: "#9270CA",
    route: "Global"
  },
];

// 菜单动画逻辑
const {sliderWidth, left, hoverStart, hoverEnd, sliderColor, click, sliderSite} = useSlider(menuItem, 1);

/* 菜单项和路由绑定 */
onMounted(() => {
  const route = useRoute();
  click(menuItem.findIndex(e => e.route === route.name));
})
// 路由绑定菜单项
onBeforeRouteUpdate((to, from) => {
  click(menuItem.findIndex(e => e.route === to.name));
})

// 菜单项绑定路由
function menuItemClick(index: number) {
  click(index)
  router.push({
    name: menuItem[index].route
  })
}


</script>

<template>
  <div class="side-bar-container">
    <div class="menu" ref="menu">
      <div class="menu-item" v-for="(item, index) in menuItem"
           :style="{
              color: index === sliderSite ? 'white' : 'black'
           }"
           :key="index"
           @click="menuItemClick(index)"
           @mouseover="hoverStart(index)"
           @mouseleave="hoverEnd">{{ item.text }}
      </div>
      <div class="animation" :style="{width: sliderWidth, left: left, backgroundColor: sliderColor}"></div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
.side-bar-container {
  width: 100%;
  height: 100%;
}

.menu {
  width: 100%;
  height: 70px;
  display: flex;
  border-radius: 8px;
  margin-left: 2px;
  margin-right: 2px;
  position: relative;
  font-family: monospace;
  font-size: calc(1.275rem + 0.3vw);

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 50%;
    background: linear-gradient(to right, #ffffff, #e3e3e3, #ffffff);
    left: 50%;
    transform: translateX(-50%);
    transition: all .5s ease 0s;
  }

  &:hover {
    &:after {
      width: 85%;
    }
  }


  .menu-item {
    flex: 1;
    line-height: 70px;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    z-index: 1;
    transition: color .5s ease;
  }

  .animation {
    height: 95%;
    position: absolute;
    left: var(--slider--left);
    z-index: 0;
    transition: all .5s ease 0s;
    border-radius: 8px;
  }
}

.content {
  margin-top: 20px;
}

</style>

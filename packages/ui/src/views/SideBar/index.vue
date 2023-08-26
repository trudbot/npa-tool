<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {useSlider} from "../../Composables/animationSlider.ts";
import {useRouter} from "vue-router";

const router = useRouter();
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


const {sliderWidth, left, hoverStart, hoverEnd, sliderColor, click, sliderSite} = useSlider(menuItem);

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

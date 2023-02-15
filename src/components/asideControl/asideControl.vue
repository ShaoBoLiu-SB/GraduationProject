<script lang="ts" setup>
import { useRouter } from "vue-router";
import { asideStore } from "@/stores/aside";

import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
const router = useRouter();
const store = asideStore();
const iconList = [store.homeIcon, store.moneyIcon, store.historyIcon];
const { confirmIndex } = storeToRefs(store);
onMounted(() => { });

// 菜单栏，写成数组，是为了循环渲染，然后动态添加类名
const menuList: Array<string> = ["首页", "货币", "历史", "测试"];
let activeIndex = ref(0);

// 获取到按钮这个dom元素
const loginButton = ref(null);

// 侧边栏鼠标item移入
function mouseOver(index: Number) {
  this.activeIndex = index;
  // 通知pinia,该让小球变成空心圆
  store.hoverDot(true);
}
// 侧边栏鼠标item移出
function mouseLeave() {
  this.activeIndex = -1;
  // 通知pinia,该让小球变回实心的
  store.hoverDot(false);

}

// 鼠标按下让按钮变小
function littleAnimation() {
  if (loginButton.value) {
    (loginButton.value as HTMLElement).style.transform = "scale(.96)";
  }
}
// 鼠标抬起按钮变大并跳转路由
function bigAndLink() {
  if (loginButton.value) {
    (loginButton.value as HTMLElement).style.transform = "scale(1)";
  }
  router.push("/login");
  activeIndex.value = -1;
}

// 点击网站logo,也可以跳转回首页
function logoLink() {
  router.push("/home");
  activeIndex.value = 0;
}

// 点击左侧的菜单栏，进行样式变化和路由跳转
function menuClick(index: number) {
  activeIndex.value = index;
  if (index == 0) {
    router.push("/home");
    store.changeIndex(index);
  }
  if (index == 1) {
    router.push("/money");
    store.changeIndex(index);
  }
  if (index == 2) {
    router.push("/history");
    store.changeIndex(index);
  }
  if(index == 3) {
    router.push('/testpage'),
    store.changeIndex(index);
  }
}

// 鼠标移到侧边栏上的菜单选项, 要有动画
function activeAni(index: number) {
  activeIndex.value = index;
}
</script>

<template>
  <div class="asideControl">
    <div class="iconBox">
      <svg class="icon" aria-hidden="true" @click="logoLink">
        <use xlink:href="#icon-jinrong"></use>
      </svg>
    </div>
    <button @mouseup="bigAndLink" @mousedown="littleAnimation" ref="loginButton" class="loginButton">
      登录
    </button>
    <div class="menus">
      <div class="menuItem" v-for="(menu, index) in menuList" :key="index" @click="menuClick(index)"
        @mouseover="mouseOver(index)" @mouseout="mouseLeave()">
        <span class="dot" :class="{
          activeDot: index == activeIndex,
          confirmDot: index == confirmIndex,
        }">·</span>
        <div class="title" :class="{
          activeTitle: index == activeIndex,
          confirmTitle: index == confirmIndex,
        }">
          {{ menu }}
        </div>
        <img :class="{
          activeImg: index == activeIndex,
          confirmImg: index == confirmIndex,
        }" :src="iconList[index]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rotate {
  animation: rotate 10s linear forwards;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.asideControl {
  position: sticky;
  z-index: 999;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background-color: #e4c572;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

  .iconBox {
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: all 2s ease;

    &:hover {
      transform: rotate(360deg);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .loginButton {
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 300px;
    margin-top: 50px;
    font-size: 18px;
    transition: all 0.2s ease-in;

    &:hover {
      box-shadow: 0 2px 10px 1px rgba(62, 62, 62, 0.196);
    }
  }

  .menus {
    display: flex;
    margin-top: 50px;
    flex-direction: column;

    .menuItem {
      margin: 30px 0;
      font-size: 22px;
      height: 65px;
      width: 95px;
      line-height: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      overflow: hidden;
      position: relative;

      .title {
        font-size: 40px;
        color: white;
        position: absolute;
        transition: all 0.5s;
        right: -100px;
      }

      img {
        position: absolute;
        width: 65px;
        height: 65px;
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.5s;
      }
    }

    .dot {
      position: absolute;
      font-size: 27px;
      margin-right: 5px;
      color: white;
      transition: all 0.5s;
      left: -10px;
    }

    .activeDot {
      left: 0;
    }

    .confirmDot {
      left: 0;
    }

    .activeImg {
      opacity: 0;
    }

    .confirmImg {
      opacity: 0;
    }

    .activeTitle {
      right: 0 !important;
    }

    .confirmTitle {
      right: 0 !important;
    }
  }
}
</style>
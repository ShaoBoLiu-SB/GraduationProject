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
// 获取侧边栏
const asideBar = ref(null);
// 获取显示隐藏按钮
const hideShowBtn = ref(null);
// 一个flag来确定侧边栏的显示隐藏操作
let hideShowFlag = ref(false);



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
  hideAsideBar();
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
  if (index == 3) {
    router.push('/testpage'),
      store.changeIndex(index);
  }
}

// 鼠标移到侧边栏上的菜单选项, 要有动画
function activeAni(index: number) {
  activeIndex.value = index;
    store.hoverDot(true);
}
function deActiveAni() {
  store.hoverDot(false)
}

// 点击显示隐藏侧边栏函数
function showAsideBar(index: any) {
  asideBar.value.style.left = `0`
  console.log('asideShow');
  // activeIndex.value = index;
}

function hideAsideBar() {
  asideBar.value.style.left = `-250px`
}
</script>

<template>
  <div class="asideControl" ref="asideBar" @mouseleave="hideAsideBar">
    <!-- 鼠标移入显示隐藏侧边栏 -->
    <div class="hideShow" ref="hideShowBtn" @mouseenter="showAsideBar">
      <svg t="1677313240459" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="14987" width="200" height="200">
        <path
          d="M372.679931 191.690834c8.782014 0 17.565051 3.235694 24.26873 9.708106l297.484322 287.175535c13.408381 12.932544 13.408381 33.9226 0 46.855144l-297.485345 287.172465c-13.408381 12.9438-35.130102 12.9438-48.53746 0-13.408381-12.932544-13.408381-33.9226 0-46.855144l273.215592-263.744893L348.411201 248.25306c-13.408381-12.932544-13.408381-33.9226 0-46.855144C355.11488 194.926528 363.897917 191.68981 372.679931 191.690834z"
          p-id="14988" fill="#e6e6e6"></path>
      </svg>
    </div>

    <div class="iconBox">
      <svg class="icon" aria-hidden="true" @click="logoLink">
        <use xlink:href="#icon-jinrong"></use>
      </svg>
    </div>

    <button @mouseup="bigAndLink" @mousedown="littleAnimation" ref="loginButton" class="loginButton">
      登录
    </button>


    <div class="menus" @mouseover="store.hoverAside(true)" >
      <div class="menuItem" v-for="(menu, index) in menuList" :key="index" @mouseover="activeAni(index)"
        @click="menuClick(index)" @mouseleave="deActiveAni">
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
  position: fixed;
  z-index: 999;
  left: -250px;
  top: 0;
  width: 250px;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  transition: left .5s;

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
        color: #8a8a8a;
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
      color: #8a8a8a;
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

// 点击显示侧边栏隐藏按钮
.hideShow {
  width: 35px;
  height: 35px;
  border: 2px solid rgb(161, 161, 161);
  // background-color: pink;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -37px;
  top: 5px;
  cursor: pointer;
}
</style>
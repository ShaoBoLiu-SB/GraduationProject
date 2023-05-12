<script setup lang="ts">
// 自己的组件
import AsideControl from "@/components/asideControl/asideControl.vue";
// vue相关
import { onMounted, ref } from "vue";
// ts数据
import { storeToRefs } from "pinia";
import { asideStore } from "@/stores/aside";
// 第三方组件

// 资源文件
import musicImg from '@/assets/temp/home/music.png'

const store = asideStore();
const { followDotFlag } = storeToRefs(store);
let followDot = ref(null);
let bgm = ref(null); //背景音乐
let bgmLogo = ref(null) //音乐logo
let timeCount = ref(0) //负责转动的音乐计时器
// 下面是三个圆圈，音乐播放的时候，动画
let circle1 = ref(null)
let circle2 = ref(null)
let circle3 = ref(null)
let mutedFlag = ref(true);

onMounted(() => {
  // 挂载让音乐图标等一下显示（为了动画效果），显示完画面，就开始播放音乐；
  setTimeout(() => {
    bgmLogo.value.style.opacity = 1;
    circle1.value.style.opacity = 1;
    circle2.value.style.opacity = 1;
    circle3.value.style.opacity = 1;
    setTimeout(() => {
      bgcControl();
      bgm.value.volume = 0.15 ; //声音别太大
    }, 10)
  }, 3500)
  // 按下鼠标左键、松开
  document.onmousedown = e => followDot.value.classList.add('active')
  document.onmouseup = e => followDot.value.classList.remove('active')

  // 移入、移出界面
  document.onmouseenter = (e) => followDot.value.classList.remove("hidden");
  document.onmouseleave = (e) => followDot.value.classList.add("hidden");

  // 插值方式，让圆圈追不上鼠标
  const lerp = (a: any, b: any, n: any) => {
    return (1 - n) * a + n * b;
  };

  // 定义接口对象： 存储鼠标移动位置信息
  interface Pos {
    preX?: Number;
    preY?: Number;
    curX?: Number;
    curY?: Number;
  }
  let pos: Pos = {
    preX: 0,
    preY: 0,
    curX: 0,
    curY: 0,
  };

  // 移动函数
  const move = (left: Number, top: Number) => {
    followDot.value.style.left = `${left}px`;
    followDot.value.style.top = `${top}px`;
  };
  document.onmousemove = (e) => {
    // 如果刚开始还是默认值鼠标的xy坐标还是对象里默认的0值， 那就
    if (!pos.curX) {
      move(e.clientX - 16, e.clientY - 16);
    }
    pos.curX = e.clientX - 16;
    pos.curY = e.clientY - 16;
  };
  function render() {
    if (pos.preX && pos.preY) {
      pos.preX = lerp(pos.preX, pos.curX, 0.15);
      pos.preY = lerp(pos.preY, pos.curY, 0.15);
      move(pos.preX, pos.preY);
    } else {
      pos.preX = pos.curX;
      pos.preY = pos.curY;
    }

    requestAnimationFrame(render);
  }
  render();
});

// 鼠标移到音乐图标要对跟随鼠标的圆圈进行动画
// 鼠标移到侧边栏上的菜单选项, 要有动画
function activeAni() {
  store.hoverDot(true);
}
function deActiveAni() {
  store.hoverDot(false)
}

// 音乐图标相关动画函数
var logoTimer: any = null;
// 点击音乐图标开始暂停
function bgcControl() {
  bgm.value.muted = false;
  // 如果是暂停状态，那就播放
  if (bgm.value.paused) {
    bgm.value.play();
    mutedFlag.value = false;
    // logoRotate(); //音乐图标转动
    logoTimer = setInterval(() => {
      timeCount.value += 2
      bgmLogo.value.style.transform = `rotate(${timeCount.value}deg)`
    }, 100);
    // 三个圆圈转动
    circle1.value.classList.add('circleAni');
    circle2.value.classList.add('circleAni');
    circle3.value.classList.add('circleAni');
    circle1.value.style.opacity = 1;
    circle2.value.style.opacity = 1;
    circle3.value.style.opacity = 1;
  }
  // 如果是播放状态那就暂停
  else {
    bgm.value.pause();
    circle1.value.style.opacity = 0;
    circle2.value.style.opacity = 0;
    circle3.value.style.opacity = 0;
    circle1.value.classList.remove('circleAni');
    circle2.value.classList.remove('circleAni');
    circle3.value.classList.remove('circleAni');
    clearInterval(logoTimer);

  }
  // if (!bgm.value.paused && bgm.value.muted) {
  //   // bgm.value.pause();
  //   bgm.value.muted = !bgm.value.muted;
  // }
}


// function logoRotate() {
//   logoTimer = setInterval(() => {
//     timeCount.value += 2
//     bgmLogo.value.style.transform = `rotate(${timeCount.value}deg)`
//   }, 100);
// }


</script>

<template>
  <div id="app">
    <AsideControl></AsideControl>
    <!-- 跟随鼠标的小点 -->
    <div class="followDot" :class="{ hoverDot: followDotFlag }" ref="followDot"> </div>

      <div class="rightContiner">
        <router-view></router-view>
      </div>




    <!-- 背景音乐 -->
    <div class="music">
      <audio src="src/assets/bgm2.mp3" loop muted="true" ref="bgm"></audio>
      <div class="imgBox">
        <div class="circle1" ref="circle1"></div>
        <div class="circle2" ref="circle2"></div>
        <div class="circle3" ref="circle3"></div>
        <img :src="musicImg" @click="bgcControl" ref="bgmLogo" @mouseover="activeAni" @mouseleave="deActiveAni">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
  // position: relative;
  display: flex;

  .rightContiner {
    flex: 1;
  }
}

/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 7px;
  height: 3px;
}

/*滚动条的滑块*/
::-webkit-scrollbar-thumb {
  background-color: #c2c2c2;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}




// 跟随鼠标的圆
.followDot {
  position: fixed;
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: 2px solid white;
  // transform: scale(1.5);
  border-radius: 32px;
  opacity: 0.9;
  z-index: 10086;
  pointer-events: none;
  transition: 0.2s ease-in-out;
  transition-property: background, opacity, transform, width, height;
}

.active {
  width: 28px;
  height: 28px;
}

.hoverDot {
  transform: scale(0.5);
  background-color: white !important;
}

.hoverAsideBar {
  background-color: gray;
}

// 背景音乐
.music {
  position: fixed;
  right: 20px;
  bottom: 20px;
  color: white;
  z-index: 999;

  .imgBox {

    .circle1,
    .circle2,
    .circle3 {
      position: absolute;
      left: 50%;
      top: 43%;
      transform: translate(-50%, -50%);
      border: 1px solid white;
      width: 26px;
      height: 26px;
      opacity: 0;
      border-radius: 30px;
    }

    .circle2 {
      animation-delay: .5s;
    }

    .circle3 {
      animation-delay: .6s;
    }

    .circleAni {
      animation: circleAni 2s linear infinite;
    }

    @keyframes circleAni {
      0% {}

      70% {
        width: 40px;
        height: 40px;
        opacity: 1;
      }

      100% {
        width: 70px;
        height: 70px;
        opacity: 0;
        // transform: rotate(190deg)
      }
    }

    img {
      width: 30px;
      height: 30px;
      opacity: 0;
      transition: opacity 2s;
      cursor: pointer;

    }
  }
}
</style>

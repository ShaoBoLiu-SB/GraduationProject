<script setup lang="ts">
import AsideControl from "@/components/asideControl/asideControl.vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { asideStore } from "@/stores/aside";
import { flatMap } from "lodash";
const store = asideStore();
const { followDotFlag } = storeToRefs(store);
let followDot = ref(null);

onMounted(() => {
  // 按下鼠标左键、松开
  document.onmousedown = e => followDot.value.classList.add('active')
  document.onmouseup = e => followDot.value.classList.remove('active')

  // 移入、移出界面
  document.onmouseenter = e => followDot.value.classList.remove("hidden");
  document.onmouseleave = e => followDot.value.classList.add("hidden");

  // 插值方式，让圆圈追不上鼠标
  const lerp = (a: any, b: any, n: any) => {
    return (1 - n) * a + n * b;
  }

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
  }

  // 移动函数
  const move = (left: Number, top: Number) => {
    followDot.value.style.left = `${left}px`
    followDot.value.style.top = `${top}px`
  }
  document.onmousemove = e => {
    // 如果刚开始还是默认值鼠标的xy坐标还是对象里默认的0值， 那就
    if (!pos.preX) {
      move(e.clientX - 8, e.clientY - 8);
      pos.curX = pos.preX = e.clientX - 8;
      pos.curY = pos.preY = e.clientY - 8;
    } else {
      pos.preX = e.clientX - 8;
      pos.preY = e.clientY - 8;
      pos.curX = lerp(pos.preX, pos.curX, .15)
      pos.curY = lerp(pos.preY, pos.curY, .15)
      move(pos.curX, pos.curY)
    }

  };


  // 检测元素最终样式（有没有pointer)
  const getStyle = (el: any, attr: any) => {
    try {
      return window.getComputedStyle
        ? window.getComputedStyle(el)[attr]
        : el.currentStyle[attr];
    } catch (e) { }
    return "";
  };




  // (this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); 
  // this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 }; 
  // this.cursor.classList.remove("hidden");





});
</script>

<template>
  <div id="app">
    <AsideControl></AsideControl>
    <!-- 跟随鼠标的小点 -->
    <div id="followDot" :class="{ hoverDot: followDotFlag }" ref="followDot"> </div>

    <div class="rightContiner">
      <router-view></router-view>
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
  height: 7px;
}

/*滚动条的滑块*/
::-webkit-scrollbar-thumb {
  background-color: #e4c572;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ffc219;
}



// 跟随鼠标的圆
#followDot {
  position: fixed;
  width: 16px;
  height: 16px;
  background: rgb(255, 255, 255);
  border-radius: 8px;
  opacity: 0.75;
  z-index: 10086;
  pointer-events: none;
  transition: 0.2s ease-in-out;
  transition-property: background, opacity, transform;
}

#followDot.hidden {
  opacity: 0;
}

#followDot.hover {
  opacity: 0.1;
  transform: scale(2.5);
}

#followDot.active {
  opacity: 0.5;
  transform: scale(0.5);
}
</style>

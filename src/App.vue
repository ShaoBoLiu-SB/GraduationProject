<script setup lang="ts">
import AsideControl from "@/components/asideControl/asideControl.vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { asideStore } from "@/stores/aside";
const store = asideStore();
const { followDotFlag } = storeToRefs(store);
let followDot = ref(null);

onMounted(() => {
  window.addEventListener("mousemove", (e) => {
    let pageX = e.pageX;
    let pageY = e.pageY;

    setTimeout(() => {
      // followDot.value.style.transform.translateY = pageX - 7 + "px";
      followDot.value.style.transform = `translate(-50%, -50%) translate(${pageX}px,${pageY
        }px)`;
      // followDot.value.style.translateY = pageY - 7 + "px";
    }, 50);
  });
});
</script>

<template>
  <div id="app">
    <AsideControl></AsideControl>
    <!-- 跟随鼠标的小点 -->
    <div class="followDot" :class="{ hoverDot: followDotFlag }" ref="followDot"> </div>

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

// 跟随鼠标的圆
.followDot {
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  background-color: cadetblue;
  transform: scale(1);
  border-radius: 8px;
  pointer-events: none; //禁止鼠标事件, 也就不会遮挡住鼠标了
  box-sizing: border-box;
  border: 5px solid transparent;
  transition: width, height, border .5s;
}

.hoverDot {
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: transparent;

  border: 5px solid #091434;
  transition: width, height, border .2s;

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
</style>

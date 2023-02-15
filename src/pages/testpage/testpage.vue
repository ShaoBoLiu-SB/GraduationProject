<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElCarousel } from 'element-plus'

let pageIndex = ref(1)
let carouselBox = ref(null)
let timer: any = null;


// 那我们今天就做一件事，鼠标滚动滑动固定页面，且有节流功能,完成,虽然是借助elementPlus!

function rollScroll(event: WheelEvent) {
  let scrollVal = event.wheelDelta || event.detail; //这个ts怎么回事,明明就有这两个属性,还报错!
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    scrollVal > 0 ? carouselBox.value.prev() : carouselBox.value.next();
  }, 100)
}



onMounted(() => {

})
</script>


<template>
  <!-- <div class="fullPageContainer" @scroll="scrollFunc">
    <div class="fullPage one"></div>
    <div class="fullPage two"></div>
    <div class="fullPage three"></div>
    <div class="fullPage four"></div>
  </div> -->
  <el-carousel height="100vh" trigger="click" :loop="false" direction="vertical" :autoplay="false" ref="carouselBox"
    @mousewheel="rollScroll">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="medium">第{{ item }}页</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>
.fullPage {
  height: 100vh;
  width: 100%;
}

.one {
  background-color: pink;
}

.two {
  background-color: cadetblue;
}

.three {
  background-color: skyblue;
}

.four {
  background-color: indianred;
}
</style>
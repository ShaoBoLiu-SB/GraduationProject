<script lang="ts" setup>
// vue相关组件
import { ref, onMounted } from 'vue';

// pinia仓库
import { homeStore } from '@/stores/home';
import { asideStore } from '@/stores/aside'

const homestore = homeStore(); //home仓库数据；
const asidestore = asideStore();

// dom元素
// 段落
let one = ref(null);
let two = ref(null);
let three = ref(null);
let lastP = ref(null);

let circle = ref(null); //"循环"
let item1 = ref(null);
let item2 = ref(null);
let item3 = ref(null);
let item4 = ref(null);
// 箭头
let arrow1 = ref(null);
let arrow2 = ref(null);
let arrow3 = ref(null);
let arrow4 = ref(null);


let Pindex = ref(0); //确定当前应该展示哪个段落
const stepIndex = ref(1);

onMounted(() => {
  console.log(homestore.pageFourIndex);

})

// 点击箭头的函数
let filterTimer: any = null;
function arrowClick() {
  if (filterTimer) return;
  filterTimer = setTimeout(() => {
    filterTimer = null;
  }, 1000)
  if (Pindex.value >= 4) return;
  Pindex.value += 1;
  if (Pindex.value == 1) {
    twoShow();
  }
  if (Pindex.value == 2) {
    threeShow();
  }
  if (Pindex.value == 3) {
    circleShow();
  }
  if (Pindex.value == 4) {
    lastPShow();
  }
}
// 根据点击箭头，让文章和循环展示出来
function twoShow() {
  two.value.style.opacity = 1;
  two.value.style.transform = `translateY(0)`
}
function threeShow() {
  three.value.style.opacity = 1;
  three.value.style.transform = `translateY(0)`;
}
function circleShow() {
  // 先让“循环”展示出来
  circle.value.style.opacity = 1;
  setTimeout(() => {
    item1.value.style.opacity = 1;
  }, 500)
  // 箭头1先出来
  setTimeout(() => {
    arrow1.value.classList.add('arrow1Ani')
  }, 1000)
  // item2再出现
  setTimeout(() => {
    item2.value.style.opacity = 1;
  }, 1500)
  // 箭头2出现
  setTimeout(() => {
    arrow3.value.classList.add('arrow3Ani')
  }, 2000)
  // item3出现
  setTimeout(() => {
    item3.value.style.opacity = 1;
  }, 2500)
  // 箭头3出现
  setTimeout(() => {
    arrow4.value.classList.add('arrow4Ani')
  }, 3000)
  // item4出现
  setTimeout(() => {
    item4.value.style.opacity = 1;
  }, 3500)
  // 箭头4出现 
  setTimeout(() => {
    arrow2.value.classList.add('arrow2Ani')
  }, 4000)

}
function lastPShow() {
  lastP.value.style.opacity = 1;
  lastP.value.style.transform = `translateX(-50%) translateY(0)`;
}
// 鼠标移入移出
function mousehover() {  
  asidestore.hoverDot(true)
}
// 鼠标移出效果
function mouseleave() {
  asidestore.hoverDot(false);
}
</script>

<template>
  <div class="total" :class="{ totalShow: homestore.pageFourIndex == 1 }">
    <!-- 文章 -->
    <div class="article">
      <p ref="one" class="one">官家垄断了煮盐、采矿、冶铁、运输、酿酒等几乎所有创新行业，投资土地就是最安全、最保值、最有效的渠道。</p>
      <p ref="two" class="two">相对而言，最简单的产业创新都需要一点一滴地积累，吸纳货币也就需要相对较长的时间；土地是高价值资产，吸纳货币的速度、能力都远高于创新产业。</p>
      <p ref="three" class="three">如果货币不能流向高利润的创新产业，只有依靠土地才能转换为财富（也许是泡沫），就会形成一种恶性循环：</p>
    </div>
    <!-- 箭头 -->
    <div class="arrows">
      <!-- <div class="upArrow"><img src="@/assets/temp/home/arrow.png" alt=""></div> -->
      <div class="downArrow">
        <img src="@/assets/temp/home/arrow.png" @click="arrowClick" @mouseover="mousehover" @mouseleave="mouseleave">
      </div>

    </div>
    <!-- 循环 -->
    <div class="circle" ref="circle">
      <div class="circleItem item1" ref="item1">货币投资于土地</div>
      <img src="@/assets/temp/home/arrow.png" class="arrow arrow1" ref="arrow1">
      <div class="circleItem item2" ref="item2">土地成为吸纳货币的重要渠道</div>
      <img src="@/assets/temp/home/arrow.png" class="arrow arrow2" ref="arrow2">
      <div class="arrow"></div>
      <img src="@/assets/temp/home/arrow.png" class="arrow arrow3" ref="arrow3">
      <div class="circleItem item4" ref="item4">刺激货币进一步流向土地</div>
      <img src="@/assets/temp/home/arrow.png" class="arrow arrow4" ref="arrow4">
      <div class="circleItem item3" ref="item3">土地兼并</div>
    </div>
    <!-- 最后一句话 -->
    <p class="last" ref="lastP">无疑，在这个循环中谁拥有更多的货币，谁就可以拥有更多的土地。</p>
    <!-- 写一个进度 -->
    <div class="step">
      {{ Pindex }} / 4
    </div>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: smile;
  src: url(@/assets/fonts/SmileySans-Oblique.ttf);
}

.total {
  transition: all 3s ease-in;
  opacity: 0;
  // display: none;
}

.totalShow {
  // display: block;
  opacity: 1;
  z-index: 99;
}

// 段落
.article {
  color: white;
  margin-top: 70px;


  p {
    width: 800px;
    margin: 30px auto;
    font-size: 20px;
    text-indent: 2em;
    transition: all 1s ease;
  }

  .two {
    opacity: 0;
    transform: translateY(-40px)
  }

  .three {
    opacity: 0;
    transform: translateY(-40px);
  }
}

// 上下箭头
.arrows {
  position: absolute;
  right: 120px;
  top: 50%;
  transform: translateY(-50%);

  .upArrow,
  .downArrow {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 20px 0;
    display: grid;
    place-items: center;
    border-color: transparent;
    transition: all .5s ease;
    cursor: pointer;
  }

  img {
    width: 80px;
  }

  .upArrow {
    border-bottom: 1px solid;

    &:hover {
      transform: translateY(-10px);
      border-color: white;
    }

    img {
      transform: rotate(180deg);
    }
  }

  .downArrow {
    border-bottom: 1px solid;

    &:hover {
      transform: translateY(10px);
      border-color: white;
    }
  }
}

// “循环”
.circle {
  width: 800px;
  height: 300px;
  border-radius: 10px;
  border: 1px solid white;
  position: absolute;
  left: 50%;
  bottom: 120px;
  transform: translateX(-50%);
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 50px 1fr;
  grid-template-rows: 1fr 20px 1fr;
  opacity: 0;
  transition: all 1s ease;

  .circleItem {
    flex: 50%;
    width: 260px;
    height: 50px;
    color: white;
    background-color: black;
    border-radius: 10px;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    font-size: 19px;
    text-align: center;
    z-index: 1;
  }

  .item1,
  .item2,
  .item3,
  .item4 {
    opacity: 0;
    background-color: black;
    transition: all 1s ease-in;
  }

  .arrow {
    width: 50px;
    color: white;
    user-select: none;
  }

  .arrow1 {
    transform: rotate(-90deg) translateY(-110px);
    opacity: 0;
  }

  .arrow1Ani {
    animation: arrow1Ani 1s ease-in-out forwards;
  }

  @keyframes arrow1Ani {
    100% {
      transform: rotate(-90deg) translateY(0);
      opacity: 1;
    }
  }

  .arrow2 {
    opacity: 0;
    transform: rotate(180deg) translateY(-70px);
  }

  .arrow2Ani {
    animation: arrow2Ani 1s ease-in-out forwards;
  }

  @keyframes arrow2Ani {
    100% {
      opacity: 1;
      transform: rotate(180deg) translateY(0px);
    }
  }

  .arrow3 {
    transform: translateY(-70px);
    opacity: 0;
  }

  .arrow3Ani {
    animation: arrow3Ani 1s ease-in-out forwards;
  }

  @keyframes arrow3Ani {
    100% {
      opacity: 1;
      transform: translateY(0px)
    }
  }

  .arrow4 {
    opacity: 0;
    transform: rotate(90deg) translateY(-100px);
  }

  .arrow4Ani {
    animation: arrow4Ani 1s ease-in-out forwards;
  }

  @keyframes arrow4Ani {
    100% {
      opacity: 1;
      transform: rotate(90deg) translateY(0px);
    }
  }

}

// 最后一句话
.last {
  position: absolute;
  width: 800px;
  margin: 30px auto;
  font-size: 20px;
  text-indent: 2em;
  color: white;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%) translateY(-50px);
  opacity: 0;
  transition: all 1s ease;
}

// 进度条
.step {
  color: white;
  position: absolute;
  right: 152px;
  font-size: 22px;
  top: 59%;
  font-family: smile;
}
</style>
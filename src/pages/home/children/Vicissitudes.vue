<script lang="ts" setup>
// vue相关组件

// pinia仓库
import { homeStore } from '@/stores/home';
const homestore = homeStore(); //home仓库数据；


</script>

<template>
  <div class="total" :class="{ totalShow: homestore.pageFourIndex == 4 }">
    <div class="article">
      <p class="articleItem article1" ref="article1">孔子曾大声疾呼“罕言利”，所谓“罕言利”是“不义而富且贵，于我如浮云”，是对缺德世人的指责。所谓“安贫乐道”是“欲速则不达；见小利，则大事不成”，是奉劝世人尊重规律，绝不能急功近利。</p>
      <p class="articleItem article1" ref="article1">道德价值当然高于物质利益，一个社会，如果失去了道德价值，眼中只剩金钱，那就是一个赤裸裸的丛林社会，所有的掠夺都会没有底线。</p>
      <p class="articleItem article1" ref="article1">这个时候，没有人能摆脱利益的诱惑，因为整个社会除了钱，已经没有其他任何东西有价值了。</p>
      <p class="articleItem article1" ref="article1">孔子临终慨叹：“天下无道久矣！”此中真味，今天，我们真的懂吗？</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.total {
  opacity: 0;
  visibility: hidden;
  transition:all 3s ease-in;
  position: absolute;
  top:0;
  width:100vw;
  height:100vh;
}

.totalShow {
  opacity: 1;
  visibility: visible;
}

.article {
  position: absolute;
  width:800px;
  top:0;
  left:50%;
  transform:translateX(-50%);
  height:100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  color:white;
  font-size:20px;
  p {
    margin:30px 0;
    color:white;
    text-indent:2em;
  }
}
</style>
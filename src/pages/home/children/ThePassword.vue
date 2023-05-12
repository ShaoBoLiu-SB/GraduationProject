<script lang="ts" setup>
// vue相关组件

// pinia仓库
import { homeStore } from '@/stores/home';
const homestore = homeStore(); //home仓库数据；


</script>

<template>
  <div class="total" :class="{ totalShow: homestore.pageFourIndex == 3 }">
    <div class="article">
      <p class="articleItem article1" ref="article1">人们往往认为，封建皇权最黑暗、剥削最残酷的时候，就会激化社会矛盾，引发反抗，最后，这个黑暗的封建王朝就会灭亡。</p>
      <p class="articleItem article1" ref="article1">我想告诉大家：封建皇权的灭亡，不可能从最坏开始，更不可能在最坏的时候发生。</p>
      <p class="articleItem article1" ref="article1">恰恰相反，一个王朝的覆灭，往往是从试图逐渐变好开始。</p>
      <p class="articleItem article1" ref="article1">最坏的封建统治者只能播撒仇恨的种子，相对宽松的统治环境才能让种子发芽、开花、结果。</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.total {
  // display: none;
  opacity: 0;
  visibility: hidden;
  transition:all 3s ease-in;
  position: absolute;
  top:0;
  width:100vw;
  height:100vh;
}

.totalShow {
  // display: block;
  opacity: 1;
  visibility: visible;
}

.article {
  position: absolute;
  width:100vw;
  top:0;
  height:100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color:white;
  font-size:20px;
  p {
    margin:30px 0;
  }
}
</style>
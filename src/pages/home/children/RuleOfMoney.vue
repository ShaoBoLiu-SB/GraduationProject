<script lang="ts" setup>
// pinia仓库
import { homeStore } from '@/stores/home';
const homestore = homeStore(); //home仓库数据；

</script>

<template>
  <div class="total" :class="{ totalShow: homestore.pageFourIndex == 2 }">
    <div class="article">
      <p class="articleItem article1" ref="article1">
        帝王追求绝对权力，是因为绝对权力有着绝对收益：消除了诸侯竞争，才能贪天下之利。帝王一个人并不能管理天下，所以，帝王抛弃了诸侯而选择了封建官僚。</p>
      <p class="articleItem article1" ref="article1">而与诸侯相比，封建官僚是一个更可怕的利益群体。
        皇帝与诸侯之间是一种”压力双向传导机制“，如果皇帝政令对封国不利，诸侯为了自己的利益可以驳回命令，压力传导到最末端的小农就会逐步衰减。</p>
      <p class="articleItem article1" ref="article1">
        封建官僚是一种“压力单向传导机制”，压力只能逐级向下传导，封建官僚不但不会分散压力，而且会为了自身利益扩大这种压力。这样，压力传导到最后的小农便会呈几何级数扩张。</p>
      <p class="articleItem article1" ref="article1">
        无论是诸侯还是帝王，说到底对国家财富都是具有所有权的，一家一姓的地盘，民不聊生对他们也没有好处。封建官僚则完全不同，只要达到目的，管你大浪滔天，反正又不是我的天下。</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.total {
  opacity: 0;
  visibility: hidden;
  transition:all 3s ease-in;
}

.totalShow {
  opacity: 1;
  visibility: visible;
}

.article {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color:white;

  p {
    width: 800px;
    margin: 30px auto;
    font-size: 20px;
    text-indent: 2em;
    transition: all 1s ease;
  }
}
</style>
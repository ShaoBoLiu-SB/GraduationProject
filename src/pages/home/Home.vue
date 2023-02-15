<script lang="ts" setup>
// 从仓库引入home页面的数据
import { homeStore } from "@/stores/home";
import { asideStore } from "@/stores/aside";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

// 用store变量接收仓库数据
const store = homeStore();
const router = useRouter();

const asidestore = asideStore()
const { homeContentList } = storeToRefs(store);

// 跳转到历史路由界面, 并改变一下侧边栏的active
function toHistory(index: number) {
  asidestore.changeIndex(2);
  router.push({
    path: "history",
    query: { pid: homeContentList.value[index].pid },
  });
}
</script>

<template>
  <div class="homePage">
    <el-carousel
      height="70vh"
      direction="vertical"
      :autoplay="true"
      interval="5000"
      :loop="true"
      :pause-on-hover="true"
    >
      <el-carousel-item v-for="(item, index) in homeContentList" :key="item">
        <img :src="item.img" alt="" />
        <h1 @click="toHistory(index)" title="点击阅读">{{ item.name }}</h1>
        <p>{{ item.desc }}</p>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.homePage {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.el-carousel {
  width: 70vw !important;
  border-radius: 10px;
}

.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;

  img {
    height: 110%;
    // width:100%;
  }

  h1 {
    cursor: pointer;
    position: absolute;
    font-size: 60px;
    white-space: nowrap;
    z-index: 999;
    color: white;
    font-family: "Courier New", Courier, monospace;
    margin-bottom: 200px;
    font-weight: bold;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  p {
    position: absolute;
    font-size: 25px;
    color: white;
    margin-top: 300px;
    width: 800px;
    text-indent: 2em;
    font-weight: normal;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
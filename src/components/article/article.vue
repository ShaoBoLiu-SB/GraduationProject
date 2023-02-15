<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { zhouDynasty } from "@/stores/articles/zhouDynasty";
const zhouDynastyStore = zhouDynasty();
const route = useRoute();

// 根据路由传递过来的id, 展示对应的文章
var article = computed(() => {
  let pid = route.query.articleId || 0;
  return zhouDynastyStore.articles[(pid as number)]
})

onMounted(() => {
  console.log(route.query.articleId);
});


</script>

<template>
  <div class="article">
    <div class="title">{{ article.title }}</div>
    <div class="paragraph" v-for="(p, index) in article.paragraphs">{{ p }}</div>
  </div>
</template>


<style lang="scss" scoped>
.article {
  padding: 50px 100px 50px;

  .title {
    margin: 0 auto;
    text-align: center;
    font-size: 60px;
    letter-spacing: 3px;
    font-weight: bold;
    color: black;
    margin: 100px 0 50px;
  }

  .paragraph {
    margin: 10px 0;
    text-indent: 2em;
    line-height: 24px;
    font-size: 18px;
    color: gray;
    border: 1px solid rgb(233, 233, 233);
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 2px 0 rgb(246, 246, 246);
  }
}
</style>
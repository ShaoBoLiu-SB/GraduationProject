<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, computed } from "vue";
import { zhouDynasty } from "@/stores/articles/zhouDynasty";
import { qinDynasty } from '@/stores/articles/qinDynasty';
import { hanDynasty } from '@/stores/articles/hanDynasty'
import { hanDynastySecound } from '@/stores/articles/hanDynastySecound'
import { hanDynastyThird } from '@/stores/articles/hanDynastyThird'
import { threeCountries } from '@/stores/articles/threeCountries'
import { twoJinDynasty } from '@/stores/articles/twoJinDynasty'
import { nanDynasty } from '@/stores/articles/nanDynasty'
import { suiDynasty } from '@/stores/articles/suiDynasty'
import { tangDynasty } from '@/stores/articles/tangDynasty'
import { tangDynastySecound } from '@/stores/articles/tangDynastySecound'
import { tangDynastyThird } from '@/stores/articles/tangDynastyThird'
const zhouDynastyStore = zhouDynasty();
const qinDynastyStore = qinDynasty();
const hanDynastyStore = hanDynasty();
const hanDynastySecoundStore = hanDynastySecound()
const hanDynastyThirdStore = hanDynastyThird()
const threeCountriesStore = threeCountries()
const twoJinDynastyStore = twoJinDynasty()
const nanDynastyStore = nanDynasty()
const suiDynastyStore = suiDynasty()
const tangDynastyStore = tangDynasty()
const tangDynastySecoundStore = tangDynastySecound()
const tangDynastyThirdStore = tangDynastyThird()

const route = useRoute();
const router = useRouter();

const dynastyList = [zhouDynastyStore, qinDynastyStore, hanDynastyStore, hanDynastySecoundStore, hanDynastyThirdStore, threeCountriesStore, twoJinDynastyStore, nanDynastyStore, suiDynastyStore, tangDynastyStore, tangDynastySecoundStore, tangDynastyThirdStore]

onMounted(() => {
  console.log(route.query);
  const pid = route.query.pid;
  console.log(pid);
});

// 根据路由传递过来的id, 展示对应的朝代文章列表
var dynastyArticle = computed(() => {
  const pid = route.query.pid || 0;
  return dynastyList[(pid as number)]
})

function toArticle(id: number) {
  router.push({
    name: "article",
    query: { articleId: id },
  });
}
</script>

<template>
  <div class="history">
    <div class="articleSection">
      <div class="articleItem" v-for="item in dynastyArticle.articles" :key="item.id">
        <div class="imgBox">
          <div class="mask">
            <img src="@/assets/temp/aside/qianbi.png" alt="">
          </div>
          <img :src="item.img" alt="" />
        </div>
        <div class="rightText">
          <div class="title" @click="toArticle(item.id)">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.history {
  .articleSection {
    margin: 100px auto 20px;
    width: 70vw;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .articleItem {
      width: 100%;
      height: 350px;
      margin: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      transition: all .3s;
      border: 1px solid rgba(0, 0, 0, .1);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.1);

      }

      .imgBox {
        flex: 3;
        height: 120%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;

        &:hover .mask {
          opacity: 1;
          cursor: pointer;
        }

        .mask {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgb(255, 255, 255, .8);
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: all .3s;

          img {
            width: 100px;
            height: 100px;
          }
        }

        img {
          // width: 100%;
          position: absolute;
          height: 100%;
        }
      }

      .rightText {
        height: 100%;
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: white;
          top: 50%;
          left: -5px;
          transform: rotate(45deg);
        }

        .title {
          color: white;
          font-size: 35px;
          font-weight: bold;
          color: black;
          cursor: pointer;
        }

        .desc {
          width: 300px;
          text-indent: 2em;
          color: gray;
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
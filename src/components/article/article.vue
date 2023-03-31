<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { zhouDynasty } from "@/stores/articles/zhouDynasty";
import { qinDynasty } from '@/stores/articles/qinDynasty';
import { hanDynasty } from '@/stores/articles/hanDynasty';
import { mingDynasty1 } from "@/stores/articles/mingDynasty";
import { tangDynasty } from '@/stores/articles/tangDynasty';
import { asideStore } from '@/stores/aside'

import { ElNotification } from 'element-plus'


// three.js相关
import * as THREE from 'three';


const zhouDynastyStore = zhouDynasty();
const qinDynastyStore = qinDynasty();
const hanDynastyStore = hanDynasty();
const tangDynastyStore = tangDynasty();
const mingDynasty1Store = mingDynasty1();
const artileDataArray = [qinDynastyStore, tangDynastyStore, mingDynasty1Store]
const route = useRoute();
const router = useRouter();
const canvasBg = ref(null); //three.js内容
const articleSection = ref(null); //文章区域
const asideStoreData = asideStore();
const nextArticle = ref(null); //下一篇文章区域

// 根据路由传递过来的id, 展示对应的文章
var article = computed(() => {
  let articleId = route.query.articleId || 0;
  let pid = Number(route.query.pid) || 0;
  return artileDataArray[pid].articles[(articleId as number)] //我这里是直接写死了，还可以改。
})

// 初始化three.js场景
function canvasInit() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  // 设置相机
  camera.position.set(0, .5, 5); //相机位置
  camera.aspect = window.innerWidth / window.innerHeight; //相机宽高比例
  camera.updateProjectionMatrix()  //更新相机投影矩阵， 
  scene.add(camera)
  const textureLoader = new THREE.TextureLoader();

  // 创建gui实例
  return { scene, camera, textureLoader };
}

onMounted(() => {
  let { scene, camera, textureLoader } = canvasInit() //初始化js场景

  // 创建例子
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3); //粒子的位置数据；
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 100 //x
    positions[i * 3 + 1] = (1 * 0.5 - Math.random() * 4 * 3) + 10//y
    positions[i * 3 + 2] = (Math.random() - 1) * 100 //z
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    color: '#ffeded',
    sizeAttenuation: textureLoader,
    size: 0.2,
  })
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);


  // 设置渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvasBg.value.appendChild(renderer.domElement);

  // 鼠标移动,相机跟随运动
  const clock = new THREE.Clock(); //three.js相机


  const cursor = { x: 0, y: 0 };

  window.addEventListener('mousemove', (event: any) => {
    cursor.x = (event.clientX / window.innerWidth - 0.5) * 2;
    cursor.y = (event.clientY / window.innerHeight - 0.5) * 2;
  })
  let parallaxX = cursor.x * 0.5
  let parallaxY = - cursor.y * 0.5
  let previousTime = 0;

  // 设置渲染函数
  const render = () => {
    renderer.render(scene, camera)
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime;
    parallaxX = cursor.x * 0.5
    parallaxY = - cursor.y * 0.5
    camera.position.x += (parallaxX - camera.position.x) * 10 * deltaTime
    camera.position.y += (parallaxY - camera.position.y) * 10 * deltaTime
    requestAnimationFrame(render)
  }
  render();
});

let scrollHeight = 0; //这个变量抽出来， 两个函数都要用
let scrollTop = 0;
// 检测页面最底部，弹出底部的下一章节
function isScrollEnd(e: any) {
  // console.log(e.target.scrollTop, 'scrollTop');
  // console.log(e.target.scrollHeight, 'scrollHeight');
  scrollTop = e.target.scrollTop;
  scrollHeight = e.target.scrollHeight;
  let result = (scrollHeight - scrollTop) - window.innerHeight;
  console.log(result);

  if (result <= 1) {
    nextArticle.value.style.bottom = '0';
  } else {
    nextArticle.value.style.bottom = '-50vh';
  }
}
// 点击回到顶部， 
function toTop() {
  const timeTop = setInterval(() => {
    articleSection.value.scrollTop -= 30;
    let top = articleSection.value.scrollTop;
    if (top <= 0) {
      clearInterval(timeTop)
    }
  }, 10)
}
// 点击跳到下一个章节
function nextOne() {
  articleSection.value.scrollTop = 0;

  let currentArticleId = Number(route.query.articleId);
  let currentPid = Number(route.query.pid);
  console.log(currentArticleId, currentPid);
  // 当文章id还是0,说明是第一张, 那就传递第二张,currentArticleId +=1 pid不变
  if (currentArticleId == 0) {
    currentArticleId += 1
  } else if (currentArticleId == 1) {
    // 文章id=1, 说明看到文章的第二张了, 要换到下一篇章节
    currentArticleId = 0;
    currentPid += 1;
    if (currentPid == 3) {
      ElNotification({
        title: '嗯~',
        message: '似乎已经咩有内容了',
        type: 'warning',
      })
      return
    }
  }



  router.push({
    name: "article",
    query: { articleId: currentArticleId, pid: currentPid },
  });
}


</script>

<template>
  <div class="article" ref="articleSection" @scroll="isScrollEnd">
    <div class="title">{{ article.title }}</div>
    <div class="paragraph" v-for="(p, index) in article.paragraphs">{{ p }}</div>
  </div>
  <div class="nextArticle" ref="nextArticle">
    <h1 @mouseover="asideStoreData.hoverDot(true)" @mouseleave="asideStoreData.hoverDot(false)" @click="nextOne">浏览下一章节</h1>
    <span @click="toTop" @mouseover="asideStoreData.hoverDot(true)"
      @mouseleave="asideStoreData.hoverDot(false)">回到顶部</span>
  </div>
  <div class="canvasBg" ref="canvasBg"></div>
</template>


<style lang="scss" scoped>
.canvasBg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.article {
  padding: 50px 100px 40vh;
  z-index: 999;
  overflow-y: scroll;
  height: 100vh;

  .title {
    margin: 0 auto;
    text-align: center;
    font-size: 60px;
    letter-spacing: 3px;
    font-weight: bold;
    color: white;
    margin: 50px 0 50px;
  }

  .paragraph {
    margin: 10px 0;
    text-indent: 2em;
    line-height: 28px;
    font-size: 18px;
    color: rgb(205, 205, 205);
    border-bottom: 1px solid rgb(233, 233, 233);
    padding: 15px 5px 5px;
    border-radius: 5px;
    letter-spacing: 2px;
    // box-shadow: 0 2px 2px 0 rgb(246, 246, 246);~
  }
}

.nextArticle {
  position: fixed;
  bottom: -50vh;
  width: 100vw;
  height: 40vh;
  // background-color: white;
  border: 1px solid white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  transition: bottom .8s;
  color: rgb(228, 228, 228);

  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    letter-spacing: 5px;
  }

  span {
    position: absolute;
    letter-spacing: 3px;
    bottom: 20px;
    left: 30px;
    cursor: pointer;
    transition: all .5s;

    &:hover {
      transform: scale(1.1);
      color: white;
    }
  }
}
</style>
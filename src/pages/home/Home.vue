<script lang="ts" setup>
// 从仓库引入home页面的数据
import { homeStore } from "@/stores/home";
import { asideStore } from "@/stores/aside";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

// 导入threejs相关模块
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js' //镜面反射
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 导入jsap动画库
import { gsap } from 'gsap'


// 导入vue相关模块
import { ref, onMounted } from 'vue';
import * as dat from 'dat.gui'
// 用store变量接收仓库数据
const store = homeStore();
const router = useRouter();
const asidestore = asideStore()
const { homeContentList } = storeToRefs(store);

// 获取dom元素
const canvasBox = ref(null); //threejs承放容器
const overLay = ref(null); //加载遮罩层的容器
const progress_bar = ref(null); //遮罩层进度条
const title0 = ref(null); //标题1春秋
const title1 = ref(null); //标题1春秋
const title2 = ref(null); //标题1春秋
const titleArray = [title0, title1, title2]

// 一些变量
let overLayText = ref('loading')

// 跳转到历史路由界面, 并改变一下侧边栏的active
function toHistory(index: number) {
  asidestore.changeIndex(2);
  router.push({
    path: "history",
    query: { pid: homeContentList.value[index].pid },
  });
}

// 鼠标移到标题栏的动画函数
function titleMouseOverEvent(event: any) {
  let titleIndex = event.target.dataset.index;
  if (titleIndex == undefined) {
    return
  } else if (titleIndex == 0) {
    // console.log(title0.value);
    title0.value.style.transform = `translateX(${-100}px)`
  } else if (titleIndex == 1) {
    title1.value.style.transform = `translateX(${-100}px)`
  } else if (titleIndex == 2) {
    title2.value.style.transform = `translateX(${-100}px)`
  }
}
// 鼠标移出标题，回到原点
function titleMouseLeaveEvent(event: any) {
  titleArray.forEach(title => {
    title.value.style.transform = `translatex(${0})`;
  })
}

onMounted(() => {
  // threejs场景初始化
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, .1, 1000);
  // 设置相机
  camera.position.set(0, .5, 5); //相机位置
  camera.aspect = window.innerWidth / window.innerHeight; //相机宽高比例
  camera.updateProjectionMatrix()  //更新相机投影矩阵， 
  scene.add(camera)
  // 加载管理监视器
  const loadingManager = new THREE.LoadingManager(
    // 加载完毕loaded
    () => {
      // Wait a little

      window.setTimeout(() => {
        // Animate overlay
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

        // Update loadingBarElement
        progress_bar.value.classList.add('ended')
        progress_bar.value.style.transform = ''
        overLayText.value = ''
        // overLay.value.style.display = 'none'
      }, 500)
      window.setTimeout(() => {
        titleArray.forEach(title => {
          title.value.style.opacity = 1;
        })
      }, 1500)

    },
    // 加载中progress
    (itemUrl: any, itemsLoaded: any, itemsTotal: any) => {
      const progressRatio: Number = itemsLoaded / itemsTotal;
      progress_bar.value.style.transform = `scaleX(${progressRatio})`

    }
  )
  // 创建纹理加载器
  const textureLoader = new THREE.TextureLoader(loadingManager);
  // 创建gui实例
  const gui = new dat.GUI();
  // 设置渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvasBox.value.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement)





  // 记录鼠标位置的对象
  const cursor = { x: 0, y: 0 }
  window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - .5;
    cursor.y = -(event.clientY / window.innerHeight - .5);
  })


  // 创建一个组，到时候移动整个组
  const sceneGroup = new THREE.Group();

  // 创建地面
  const plane1Geometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    side: THREE.DoubleSide,
    metalness: 0.9,
    roughness: 0,

  });
  const plane1 = new THREE.Mesh(plane1Geometry, planeMaterial);
  plane1.rotation.x = Math.PI / 2;
  plane1.position.y = -0.9;
  // sceneGroup.add(plane1)

  // 创建镜面平面(地面)
  const mirrorGeometry = new THREE.PlaneGeometry(20, 20);
  const mirror = new Reflector(mirrorGeometry, {
    clipBias: .1,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    multisample: 10,
    // color: 0x000000,
    // 记得去纹理网站找个环境贴图, 合适的就行!!!
  })
  // mirror.rotation.x = Math.PI / 4;
  mirror.position.y = -1;
  mirror.position.z = .1;
  mirror.rotation.x = -Math.PI / 2;
  gui.add(mirror.position, 'y').min(-2).max(2).step(.001).name('mirrorY')
  gui.add(mirror.position, 'x').min(-2).max(2).step(.001).name('mirrorX')
  gui.add(mirror.position, 'z').min(-2).max(2).step(.001).name('mirrorZ')
  gui.add(mirror.rotation, 'x').min(-3.15).max(3.15).step(.001).name('mirrorRotateX')
  gui.add(mirror.rotation, 'y').min(-3.15).max(3.15).step(.001).name('mirrorRotateY')
  gui.add(mirror.rotation, 'z').min(-3.15).max(3.15).step(.001).name('mirrorRotateZ')
  sceneGroup.add(mirror)


  // 创建荧幕材质（就是张图片）
  const pic1 = `/src/assets/temp/home/14.jpg`
  const pic2 = `/src/assets/temp/home/20.jpg`
  const screenMapTexture = textureLoader.load(pic1)
  const screenMaterial = new THREE.MeshStandardMaterial({
    // color: 0xffffff,
    map: screenMapTexture,
    emissiveMap: screenMapTexture,

  })
  // 创建三个荧幕
  const screenGeometry1 = new THREE.PlaneGeometry(4, 2.2)
  const screen1 = new THREE.Mesh(screenGeometry1, screenMaterial);
  const screen2 = new THREE.Mesh(screenGeometry1, screenMaterial);
  const screen3 = new THREE.Mesh(screenGeometry1, screenMaterial);
  screen1.position.set(0, 0.3, 0)
  screen2.position.set(-3, 0.28, 1.9)
  screen2.rotation.y = 1.31;
  screen3.position.set(3, 0.28, 1.9)
  screen3.rotation.y = -1.33;

  // gui控制器， 方便控制物体位置
  gui.add(screen2.position, 'x').min(-5).max(0).step(.001)
  gui.add(screen2.position, 'y').min(2).max(2).step(.001)
  gui.add(screen2.position, 'z').min(0).max(2).step(.001)
  gui.add(screen2.rotation, 'y').min(-4).max(4).step(.001)
  // gui.add(plane1.position, 'x').min(-5).max(0).step(.001)
  // gui.add(plane1.position, 'y').min(-2).max(2).step(.001)
  // gui.add(plane1.position, 'z').min(0).max(2).step(.001)

  // 将场景中的物体放入组中，方面同时操作。
  sceneGroup.add(screen1);
  sceneGroup.add(screen2)
  sceneGroup.add(screen3)
  scene.add(sceneGroup)


  // 书写加载进度功能
  /**
 * Overlay遮罩层
 */
  const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
      uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
  })
  const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
  scene.add(overlay)


  // 计时器
  const clock = new THREE.Clock();
  let previousTime = 0; //记录前一次时间

  //设置渲染函数
  const render = () => {
    renderer.render(scene, camera);

    // 计时器时间
    const elapsedTime = clock.getElapsedTime();
    let delatTime = elapsedTime - previousTime;  //计算出时间差
    previousTime = elapsedTime;

    // 随着鼠标移动场景物体组
    sceneGroup.rotation.y = cursor.x / 5
    sceneGroup.rotation.x = cursor.y / 5
    // sceneGroup.ratation.y += cursor.y / 10


    // 调用请求动画帧，无限递归渲染出画面
    requestAnimationFrame(render);
  }
  render(); //调用一下，才能无限递归下去


  // 添加一个测试灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

})
</script>

<template>
  <div class="homePage">
    <!-- 遮挡遮罩 -->
    <div class="overLay" ref="overLay">
      <div class="progress_bar" ref="progress_bar"> {{ overLayText }}
      </div>
    </div>
    <!-- 标题 -->
    <div class="titleSection">
      <h1 class="title" ref="title0" :data-index="0" @mouseover="titleMouseOverEvent" @mouseleave="titleMouseLeaveEvent">
        CHUN QIU</h1>
      <h1 class="title" ref="title1" :data-index="1" @mouseover="titleMouseOverEvent" @mouseleave="titleMouseLeaveEvent">
        ZHAN GUO</h1>
      <h1 class="title" ref="title2" :data-index="2" @mouseover="titleMouseOverEvent" @mouseleave="titleMouseLeaveEvent">
        HAN
      </h1>
    </div>
    <!-- threejs盒子 -->
    <div class="canvasBox" ref="canvasBox"></div>

  </div>
</template>

<style lang="scss" scoped>
.homePage {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .overLay {
    // position: absolute;
    // width: 100%;
    // background-color: black;
    // height: 100%;
    // z-index: 998;
    // overflow: hidden;

    .progress_bar {
      position: absolute;
      top: 50%;
      width: 100%;
      height: 2px;
      background: #ffffff;
      transform: scaleX(0.1);
      // transform-origin: top left;
      transition: transform 0.5s;
      text-align: center;
      color: white;
      line-height: 100px;
      font-size: 25px;
      font-weight: 700;
      z-index: 999;
    }

    .progress_bar.ended {
      transform: scaleX(0);
      transition: all 1.5s ease-in-out;
    }
  }





  // 标题区域
  .titleSection {
    width: 700px;
    height: 100vh;
    position: absolute;
    right: 30px;
    // background-color: pink;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      color: white;
      width: 300px;
      margin: 50px 0;
      cursor: pointer;
      transition: transform, opacity, .5s;
      opacity: 0;
    }
  }
}
</style>
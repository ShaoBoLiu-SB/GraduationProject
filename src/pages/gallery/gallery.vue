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
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
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
const title1 = ref(null); //三个标题
const title2 = ref(null);
const title3 = ref(null);
const titlesBox = ref(null);
const titleArray = [title1, title2, title3];
const picUrl = ref(`/src/assets/temp/home/qin1.webp`)
const picUrlArray = ['/src/assets/temp/home/qin1.webp', '/src/assets/temp/home/tang11.jpg', '/src/assets/temp/home/ming1.jpg']

// 一些变量
let overLayText = ref('loading') //遮罩层加载文字
let mouseMoveFlag = ref(false); //决定鼠标影不影响模型移动
let changeMaterial0: any = null; //切换荧幕材质为第0张
let changeMaterial1: any = null; //切换荧幕材质为第1张
let changeMaterial2: any = null; //切换荧幕材质为第2张

// 跳转到历史路由界面, 并改变一下侧边栏的active
function toHistory(index: number) {
  asidestore.changeIndex(2);
  router.push({
    path: "history",
    query: { pid: homeContentList.value[index].pid },
  });
}

// 鼠标移入移除标题
function titleOver(event: any) {
  let index = event.target.dataset.index;
  if (index == undefined) return;
  asidestore.hoverDot(true)
  titleArray[index].value.style.transform = `translateX(${-120}px)`
  if (index == 0) {
    changeMaterial0()
  } else if (index == 1) {
    changeMaterial1()
  } else if (index == 2) {
    changeMaterial2();
  }
  picUrl.value = picUrlArray[index]
}
function titleLeave() {
  asidestore.hoverDot(false)
  titleArray.forEach(title => {
    title.value.style.transform = `translateX(${0}px)`
  })
}


// 初始化three.js场景
function canvasInit() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, .1, 1000);
  // 设置相机
  camera.position.set(0, .5, 5); //相机位置
  camera.aspect = window.innerWidth / window.innerHeight; //相机宽高比例
  camera.updateProjectionMatrix()  //更新相机投影矩阵， 
  scene.add(camera)
  // 创建gui实例
  const gui = new dat.GUI();
  return { scene, camera, gui }
}

onMounted(() => {
  // threejs场景初始化
  let { scene, camera, gui } = canvasInit()
  // 创建一个组，到时候移动整个组
  const sceneGroup = new THREE.Group();
  sceneGroup.rotation.set(0.2, 0.3, 0)

  // 加载管理监视器
  const loadingManager = new THREE.LoadingManager(
    // 加载完毕loaded
    () => {
      // Wait a little
      window.setTimeout(() => {
        // Animate overlay
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

        // Update loadingBarElement
        overLay.value.classList.add('ended')
        overLay.value.style.transform = ''
        overLayText.value = ''
        setTimeout(() => {
          // 加载完成，有一个小的移动动画
          gsap.to(sceneGroup.rotation, { x: 0, y: 0, duration: 1.5, ease: 'power2' })
          mouseMoveFlag.value = true; //允许鼠标跟随
          gsap.to(titlesBox.value, { opacity: 1, duration: 1.5 }) //是标题栏淡入
        }, 1000)

      }, 500)
    },
    // 加载中progress
    (itemUrl: any, itemsLoaded: any, itemsTotal: any) => {
      const progressRatio: Number = itemsLoaded / itemsTotal;
      console.log(itemsLoaded, itemsTotal);
      overLay.value.style.transform = `scaleX(${progressRatio})`
    }
  )
  // 创建纹理加载器
  const textureLoader = new THREE.TextureLoader(loadingManager);
  // 创建hdr图片加载器
  const rgbeLoader = new RGBELoader();
  rgbeLoader.loadAsync('/src/assets/model/textures/background.hdr').then(
    (texture: any) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
    }
  )

  // 设置渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvasBox.value.appendChild(renderer.domElement);
  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  // controls.enabled = false; //禁止使用控制器！
  gui.add(controls, 'enabled')


  // 记录鼠标位置的对象
  const cursor = { x: 0, y: 0 }
  window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - .5;
    cursor.y = -(event.clientY / window.innerHeight - .5);
  })


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
  const mirrorGeometry = new THREE.PlaneGeometry(5, 5);
  const mirror = new Reflector(mirrorGeometry, {
    clipBias: 0.1,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
  })
  mirror.position.y = -1;
  mirror.position.z = .1;
  mirror.rotation.x = -Math.PI / 2;
  sceneGroup.add(mirror)


  // 创建荧幕材质（就是张图片）
  const screenMapTexture1 = textureLoader.load(picUrl.value) //材质图片1
  const screenMapTexture2 = textureLoader.load(picUrlArray[1]) //材质图片2
  const screenMapTexture3 = textureLoader.load(picUrlArray[2]) //材质图片2

  let screenMaterial = new THREE.MeshStandardMaterial({
    map: screenMapTexture1,
    // emissiveMap: screenMapTexture1,
  })
  // const screenMaterial2 = new THREE.MeshStandardMaterial({
  //   map: screenMapTexture2,
  //   // emissiveMap: screenMapTexture1,
  // })
  changeMaterial0 = () => {
    screenMaterial.map = screenMapTexture1;
  }
  changeMaterial1 = () => {
    screenMaterial.map = screenMapTexture2;
  }
  changeMaterial2 = () => {
    screenMaterial.map = screenMapTexture3;
  }
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
  // gui.add(screen2.position, 'x').min(-5).max(0).step(.001)
  // gui.add(screen2.position, 'y').min(2).max(2).step(.001)
  // gui.add(screen2.position, 'z').min(0).max(2).step(.001)
  // gui.add(screen2.rotation, 'y').min(-4).max(4).step(.001)
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

  function sceneModuleMoveFunc() {
    // 随着鼠标移动场景物体组
    sceneGroup.rotation.y = cursor.x / 5
    sceneGroup.rotation.x = cursor.y / 5
  }

  //设置渲染函数
  const render = () => {
    renderer.render(scene, camera);

    // 计时器时间
    const elapsedTime = clock.getElapsedTime();
    let delatTime = elapsedTime - previousTime;  //计算出时间差
    previousTime = elapsedTime;

    // 当three.js场景加载完了，才能使用鼠标移动场景功能！
    if (mouseMoveFlag.value) {
      sceneModuleMoveFunc();
    }


    // 调用请求动画帧，无限递归渲染出画面
    requestAnimationFrame(render);
  }
  render(); //调用一下，才能无限递归下去


  // 添加一个测试灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

})
</script>

<template>
  <div class="homePage">
    <!-- 遮挡遮罩 -->
    <div class="overLay" ref="overLay">
      {{ overLayText }}
    </div>
    <div class="titlesBox" @mouseover="titleOver" ref="titlesBox">
      <div class="titleItem" ref="title1" :data-index="0" @click="toHistory(0)" @mouseleave="titleLeave">
        <h1>战国</h1><span>The Period of Warring States</span>
      </div>
      <div class="titleItem" ref="title2" :data-index="1" @click="toHistory(1)" @mouseleave="titleLeave">
        <h1>唐朝</h1><span>The Tang Dynasty</span>
      </div>
      <div class="titleItem" ref="title3" :data-index="2" @click="toHistory(2)" @mouseleave="titleLeave">
        <h1>明朝</h1><span>The Ming Dynasty</span>
      </div>
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
    position: absolute;
    top: 50%;
    width: 100%;
    height: 2px;
    background: #ffffff;
    transform: scaleX(0.1);
    transition: transform 0.5s;
    text-align: center;
    color: white;
    line-height: 50px;
  }

  .overLay.ended {
    transform: scaleX(0);
    transition: all 1.5s ease-in-out;
  }

  // 标题
  .titlesBox {
    position: absolute;
    right: 0;
    height: 100vh;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;

    .titleItem {
      width: 400px;
      margin: 40px 0;
      display: flex;
      cursor: pointer;
      align-items: center;
      color: white;
      transition: all .5s;

      h1 {
        margin-right: 20px;
      }
    }
  }
}
</style>
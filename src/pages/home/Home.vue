<script lang="ts" setup>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { ref, onMounted } from 'vue'
import * as dat from 'dat.gui';
import { gsap } from 'gsap'
import { ElCarousel } from 'element-plus'
import { useRouter } from 'vue-router';
import { asideStore } from '@/stores/aside'

const store = asideStore();
const router = useRouter();

// 一些数据和dom
let firstPage = ref(null);
let overLay = ref(null);
let carouselBox = ref(null)
let timer: any = null;
let elSwiper = ref(null);
const elIndex = ref(0); //确定轮播图滚动到那一页
const pageTwo = ref(null) //第二页轮播图
const pageFour = ref(null) //第四页轮播图
// 第三页的dom元素
const h1 = ref(null);
const h3 = ref(null);
const text = ref(null);
const circle1 = ref(null);
const circle2 = ref(null);
const overLayCircle = ref(null);
const topTitle = ref(null)
const btmTitle = ref(null)
const startView = ref(null);


// 一些变量
const overLayText = ref('loading');

// 需要将一些操作的动画函数抽离出来，方便调用
let pageOneFn: any = null;
let pageTwoFn: any = null;
let pageThreeFn: any = null;
let pageFourFn: any = null;

onMounted(() => {
  const scene = new THREE.Scene();  //场景
  const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);  //相机
  // const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 0.1, 1000)
  // const raycaster = new THREE.Raycaster();  //射线投射器
  // const pointer = new THREE.Vector2();  
  const gui = new dat.GUI();

  const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper)

  // 设置相机位置
  camera.position.set(0, 0, 1.5);
  // 设置相机视图比例
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵,类似blender应用缩放
  camera.updateProjectionMatrix();
  scene.add(camera);

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
          elSwiper.value.style.opacity = 1
        }, 1000)
      }, 500)
    },
    // 加载中progress
    (itemUrl: any, itemsLoaded: any, itemsTotal: any) => {
      const progressRatio: Number = itemsLoaded / itemsTotal;
      // console.log(itemsLoaded, itemsTotal);
      overLay.value.style.transform = `scaleX(${progressRatio})`

    }
  )
  // // 贴图加载器
  // const textureLoader = new THREE.TextureLoader(loadingManager);
  // const normalTexture = textureLoader.load('/src/assets/model/buddha/test/normal.jpg')
  // const aoTexture = textureLoader.load('/src/assets/model/buddha/test/ao.jpg')
  // const roughnessTexture = textureLoader.load('/src/assets/model/buddha/test/roughness.jpg')
  // const heightTexture = textureLoader.load('/src/assets/model/buddha/height.jpg')
  // const colorTexture = textureLoader.load('/src/assets/model/buddha/test/color1.png')
  // const dispTexture = textureLoader.load('/src/assets/model/buddha/disp.jpg')

  // 把模型单独抽成一个变量，不能放在函数里面，局部作用域很麻烦。
  let buddhModel: any = null;
  let inkCircle: any = null;
  // 模型加载器
  const gltfLoader = new GLTFLoader(loadingManager);
  const dracoLoader = new DRACOLoader(); //压缩模型加载器（draco）
  dracoLoader.setDecoderPath('three.js/examples/js/libs/draco/gltf/');//设置解压库文件路径
  dracoLoader.setDecoderConfig({ type: 'js' })  //使用js方式解压
  dracoLoader.preload();
  gltfLoader.setDRACOLoader(dracoLoader);
  // gltfLoader.load('/src/assets/model/buddha/buddha1.glb', (gltf: any) => {
  gltfLoader.load('/public/buddha1.glb', (gltf: any) => {
    buddhModel = gltf.scene;
    // buddhModel.position.set(0.16, 0, 0)
    buddhModel.position.set(0.35, 0, 0)
    buddhModel.rotation.y = 8.65;
    buddhModel.scale.set(0.05, 0.05, 0.05)
    console.log(buddhModel);

    // console.log(buddhModel.children[0].geometry);
    gsap.to(buddhModel.position, { x: 0.16, duration: 2, delay: 1 })
    gsap.to(buddhModel.rotation, { y: -0.165, duration: 2, delay: 1 })

    // let modelGeometry = model.children[0].geometry
    // model.traverse((gltf: any) => {
    //   gltf.material = new THREE.MeshBasicMaterial({
    //     // map: colorTexture,
    //     // normalMap: normalTexture,
    //     // aoMap: aoTexture,
    //     // roughnessMap: roughnessTexture,
    //   })
    // })
    // modelGeometry.setAttribute('uv2', new THREE.BufferAttribute(modelGeometry.attributes.uv.array, 2))
    // model.castShadow = true;
    // model.receiveShadow = true;
    pageOneFn = () => {
      gsap.to(buddhModel.position, { x: 0.16, y: 0, z: 0, duration: 1 })
      gsap.to(buddhModel.rotation, { y: -0.165, duration: 1 })
    }
    pageTwoFn = () => {
      gsap.to(buddhModel.position, { x: 0, y: -0.043, z: 0, duration: 1, })
      gsap.to(buddhModel.rotation, { y: -6.4, duration: 1, })
    }
    pageThreeFn = () => {
      gsap.to(buddhModel.position, { x: -0.09, y: -0.05, z: 0.77, duration: 1, })
      gsap.to(buddhModel.rotation, { y: -4.876, duration: 1, })
    }
    pageFourFn = () => {
      gsap.to(buddhModel.position, { x: 0, y: -0.05, duration: 2, })
      gsap.to(buddhModel.rotation, { y: -0.109, duration: 2, })
    }


    scene.add(buddhModel);


    // gui.add(buddhModel.position, 'x').max(0.5).min(0).step(.001)
    // gui.add(buddhModel.position, 'y').max(0.5).min(-0.5).step(.001)
    // gui.add(buddhModel.position, 'z').max(2).min(-1).step(.001)
    // gui.add(buddhModel.rotation, 'y').max(1).min(-7).step(.0001)
    // gui.add(buddhModel.rotation, 'z').max(.5).min(.5).step(.0001)


  })

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  // 设置渲染器大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearAlpha(0);
  // renderer.setClearColor(0xffffff, 1);
  renderer.shadowMap.enabled = true;
  // 将渲染器添加到页面
  firstPage.value.appendChild(renderer.domElement);

  //添加控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled = false;
  // 设置控制器阻尼
  // controls.enableDamping = true;

  // 添加环境灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  // scene.add(ambientLight);

  // 添加直射光
  const directionLight = new THREE.DirectionalLight(0xffffff, 1);
  directionLight.position.set(0, 2, 5);
  // directionLight.scale.set(10, 10);
  scene.add(directionLight)




  // 渲染函数
  const render = () => {
    // 更新控制器
    // controls.update();
    // 渲染场景
    renderer.render(scene, camera);
    // 循环渲染
    requestAnimationFrame(render);
  }
  render();

})


// 节流的滚动操作
let filterTimer: any = null;
// 轮播图滚动函数
function rollScroll(event: any) {
  // 节流！！！
  if (filterTimer) return;
  filterTimer = setTimeout(() => {
    filterTimer = null;
  }, 1200)
  // 节流！！！

  let scrollVal = event.wheelDelta || event.detail; //这个ts怎么回事,明明就有这两个属性,还报错!
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (scrollVal > 0) {
      // 切换页面
      carouselBox.value.prev()
      if (elIndex.value > 0) {
        elIndex.value -= 1
      }
      // 第一页动画
      if (elIndex.value == 0) {
        pageOneFn();
      }
      // 第二页动画
      if (elIndex.value == 1) {
        pageTwoFn();
        pageTwoAniShow();
      } else {
        pageTwoAniHide();
      }
      // 第三页动画
      // 滚动到第三页的动画
      if (elIndex.value == 2) {
        pageThreeFn();
        startView.value.style.bottom = '-200px';
        setTimeout(() => {
          pageThreeShow();
        }, 500)
        // 第四页重新编程圆角
        pageFour.value.style.borderRadius = '40px';
        pageFour.value.style.borderTopLeftRadius = '40px';
        pageFour.value.style.borderTopRightRadius = '40px';
        overLayCircle.value.style.width = '10px';
        overLayCircle.value.style.height = '10px';
        overLayCircle.value.style.width = '0px';
        overLayCircle.value.style.height = '0px';
        // pageFour.value.style.backgroundColor = 'white'
        overLayCircle.value.style.backgroundColor = 'black'
        pageFourHide();

      } else {
        pageThreeHide();
      }
      if (elIndex.value == 3) {
        pageThreeShow();
        pageThreeFn();
        startView.value.style.bottom = '-200px';
      }
    } else {
      if (elIndex.value == 3) {
        startView.value.style.bottom = 0;
      }
      carouselBox.value.next();
      // 计算滚动到第几页
      if (elIndex.value < 3) {
        // 只能让elIndex = 3

        elIndex.value += 1
      }
      // 滚动到第二页的动画
      if (elIndex.value == 1) {
        pageTwoFn();
        setTimeout(() => {
          pageTwoAniShow();
        }, 500)
      } else {
        pageTwoAniHide();
      }
      // 滚动到第三页的动画
      if (elIndex.value == 2) {
        pageThreeFn();
        setTimeout(() => {
          pageThreeShow();
        }, 500)
      } else {
        pageThreeHide();
      }
      if (elIndex.value == 3) {
        pageFourFn();
        console.log('滚动到第四页');
        pageFour.value.style.borderRadius = '0px';
        overLayCircle.value.style.width = '3000px';
        overLayCircle.value.style.height = '3000px';
        setTimeout(() => {
          pageFour.value.style.backgroundColor = 'transparent'
          overLayCircle.value.style.backgroundColor = 'transparent'
        }, 800)
        setTimeout(() => {
          pageFourShow()
        }, 1500)
      }
    }
  }, 100)
}
// 滚动到第二页
function pageTwoScrollFn() {

}

// 滚动到第二页，让文字动画显示
function pageTwoAniShow() {
  pageTwo.value.style.opacity = 1;
  pageTwo.value.style.transform = `translateY(0)`;
}
function pageTwoAniHide() {
  pageTwo.value.style.opacity = 0;
  pageTwo.value.style.transform = `translateY(${100}px)`;
}
// 滚动到第三页,把动画封装起来
function pageThreeShow() {
  h1.value.style.transform = `translateY(${0}px)`
  h3.value.style.transform = `translateY(${0}px)`
  text.value.style.opacity = 1;
  circle1.value.style.opacity = 1;
  circle2.value.style.opacity = 1;
  circle1.value.style.transform = `translateY(${0}px)`;
  circle2.value.style.transform = `translateY(${0}px)`;
}
function pageThreeHide() {
  h1.value.style.transform = `translateY(${90}px)`
  h3.value.style.transform = `translateY(${25}px)`
  text.value.style.opacity = 0;
  circle1.value.style.opacity = 0;
  circle2.value.style.opacity = 0;
  circle1.value.style.transform = `translateY(${50}px)`;
  circle2.value.style.transform = `translateY(${50}px)`;
}
function pageFourShow() {
  topTitle.value.style.opacity = 1;
  setTimeout(() => {
    btmTitle.value.style.opacity = 1;
  }, 500)
}
function pageFourHide() {
  topTitle.value.style.opacity = 0;
  btmTitle.value.style.opacity = 0;
}

// 回到顶部
function backTop() {
  carouselBox.value.setActiveItem(0);
  elIndex.value = 0;
  pageOneFn();
  startView.value.style.bottom = '-200px';

}



</script>

<template>
  <!-- 遮挡遮罩 -->
  <div class="overLay" ref="overLay">
    {{ overLayText }}
  </div>


  <div class="elSwiper" ref="elSwiper">
    <el-carousel height="100vh" trigger="click" :loop="false" indicator-position=none direction="vertical"
      :autoplay="false" @mousewheel="rollScroll" ref="carouselBox">
      <el-carousel-item class="pageOne" name="pageOne">
        <h1>中国是部</h1>
        <h1>金融史</h1>
        <span>君主们在任何时候都不得不服从经济条件，并且从来不能向经济条件发号施令。<br>无论是政治的立法或市民的立法，都只是表明和记载经济关系的要求而已。</span>
        <span>——卡尔·马克思</span>
      </el-carousel-item>

      <el-carousel-item class="pageTwo" name="pageTwo">
        <div ref="pageTwo" class="pageTwoContainer">
          <div class="left">
            <h3>改革的真谛在于对立双方的妥协</h3>
            <h3>妥协不是投降</h3>
            <h3>而是在损失最小的情况下寻求前进的路径</h3>
            <span>—— 引自章节《管仲的刀》</span>
          </div>
          <div class="right">
            <h3>金钱永远可以代表利益</h3>
            <h3>所谓民心</h3>
            <h3>不过是给大部分人一个公平赚钱的机会</h3>
            <span>引自章节《此朝无钱胜有钱（周朝）》——</span>
          </div>
        </div>
      </el-carousel-item>

      <el-carousel-item>
        <div class="pageThree" ref="pageThree">
          <div class="title">
            <div class="decCircle1" ref="circle1"></div>
            <div class="h1Box">
              <h1 ref="h1">秦失其鹿，天下共逐之。</h1>
            </div>
            <div class="h3Box">
              <h3 ref="h3">优雅的中国古文这样描述类似的场景:“秦失其鹿，天下共逐之。”直白的翻译只需要四个字:天下大乱。</h3>
            </div>
          </div>
          <div class="text" ref="text">
            <i class="quote">"</i>
            <span>&nbsp;&nbsp;&nbsp;豪强军阀就是传说中的土匪，从王莽被杀到汉光武帝刘秀建立东汉，中原大地先
              后出现了十一个皇帝。很难分清这些人哪个是真的皇帝，哪个是真的土匪，或者，皇
              帝本就是土匪，土匪当大了就成了皇帝。
              新制度经济学代表人物诺斯曾经比较过国家与土匪。他认为，国家和土匪本质上
              是一样的，大家都以暴力为基础进行抢劫，土匪抢钱，有去无回;国家抢钱，有去有回。
              土匪也可变成国家，只要能保护黎民百姓不让别的土匪抢劫....
            </span>
            <div class="decCircle2" ref="circle2"></div>
          </div>
        </div>
      </el-carousel-item>

      <el-carousel-item>
        <div class="pageFour" ref="pageFour">
          <div class="overLayCircle" ref="overLayCircle"></div>
          <div class="titles">
            <div class="top" ref="topTitle">
              <div class="h1Boxs">
                <h1>贫富的逻辑</h1>
                <div class="line"></div>
              </div>
              <div class="h1Boxs">
                <h1>金权的规则</h1>
                <div class="line"></div>
              </div>
            </div>
            <div class="bottom" ref="btmTitle">
              <div class="h1Boxs">
                <h1>盛衰的密码</h1>
                <div class="line"></div>
              </div>
              <div class="h1Boxs">
                <h1>人间的沧桑</h1>
                <div class="line"></div>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>

  <div class="startView" ref="startView">
    <h1 @click="router.push('/gallery')" @mouseover="store.hoverDot(true)" @mouseleave="store.hoverDot(false)">开始探索</h1>
    <span @click="backTop" @mouseover="store.hoverDot(true)" @mouseleave="store.hoverDot(false)">回到顶部</span>
  </div>

  <div class="canvasBg" ref="firstPage"></div>
</template>

<style lang="scss" scoped>
$fontColor: #ffffff;

.overLay {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 2px;
  background: white;
  transform: scaleX(0.1);
  // transform-origin: top left;
  transition: transform 0.5s;
  text-align: center;
  color: white;
  line-height: 50px;
  line-height: 100px;
  font-size: 25px;
  font-weight: 700;
  z-index: 999;
}

.overLay.ended {
  transform: scaleX(0);
  transition: all 1.5s ease-in-out;
}

.elSwiper {
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  transition: opacity .5s;
}

.canvasBg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

.pageOne {
  width: 600px;
  height: 100vh;
  // background-color: pink;
  position: relative;
  left: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  // align-items: center;
  h1 {
    font-size: 100px;
    color: $fontColor;
    transform: translateY(-50px)
  }

  span {
    color: $fontColor;
    line-height: 30px;
  }
}

.pageTwoContainer {
  transform: translateY(100px);
  height: 100vh;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.5s
}

.pageTwo {

  .left,
  .right {
    display: flex;
    flex-direction: column;

    span {
      color: $fontColor;
      margin-top: 30px;
    }
  }

  .left {
    justify-content: flex-start;
    margin-right: 230px;
  }

  .right {
    margin-left: 230px;
    align-items: flex-end;
  }

  h3 {
    color: $fontColor;
    line-height: 60px;
  }
}

.pageThree {
  color: $fontColor;
  width: 900px;
  height: 100vh;
  // background-color: pink;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .h1Box {
    overflow: hidden;
    transform: translateY(-40px);

    h1 {
      font-size: 70px;
      transform: translateY(90px);
      transition: transform 1s;
    }
  }

  .h3Box {
    overflow: hidden;
    transform: translateY(-40px);

    h3 {
      transform: translateY(25px);
      transition: transform 1.5s;
    }
  }

  .decCircle1,
  .decCircle2 {
    width: 120px;
    height: 120px;
    border-radius: 200px;
    background-color: gray;
    opacity: 0;
    transition: all 1s;
  }

  .decCircle1 {
    position: relative;
    right: 20px;
    transform: translateY(50px);
  }

  .text {
    transform: translateY(60px);
    width: 800px;
    opacity: 0;
    transition: all 1s;

    .quote {
      font-size: 50px;
      color: rgb(180, 180, 180);
      position: relative;
      left: -12px;
    }

    span {
      line-height: 30px;
    }

    .decCircle2 {
      position: relative;
      left: 500px;
      transform: translateY(50px);
    }
  }
}

.pageFour {
  width: 100%;
  height: 100%;
  // border-radius: 40px;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: white;
  transition: border-radius 3s;

  .overLayCircle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0px;
    height: 0px;
    border-radius: 10000px;
    background-color: black;
    transition: 2s;
    transition-property: width, height, background-color;
    pointer-events: none;
  }

  .titles {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .top,
    .bottom {
      // flex:1;
      width: 100vw;
      height: 30vh;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      .h1Boxs {
        &:first-child {
          margin-right: 280px;
        }

        &:last-child {
          margin-left: 280px;
        }
      }
    }


    .h1Boxs {
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        color: rgb(190, 189, 189);
        // margin: 50px 0;
        font-size: 60px;
        // transition:all .5s;

        &:hover {
          cursor: pointer;
          color: white;
          text-decoration: dashed;
        }
      }

      h1:hover+.line {
        width: 300px;
      }

      .line {
        height: 2px;
        width: 0px;
        background-color: rgb(209, 209, 209);
        transition: all .5s !important;
      }
    }

    .top,
    .bottom {
      opacity: 0;
      transition: all 1s;

      h1 {
        // padding-bottom:10px;
        // transition:all 1s;
        // border-bottom:4px solid white;
        transition: all 1s;

        // &:first-child {
        //   margin-right: 280px;
        // }

        // &:last-child {
        //   margin-left: 280px;
        // }
      }
    }
  }
}


.startView {
  position: fixed;
  bottom: -200px;
  z-index: 999;
  width: 100vw;
  height: 200px;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: white;
  transition: bottom 1s;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    cursor: pointer;
    letter-spacing: 5px;
  }

  span {
    position: absolute;
    bottom: 20px;
    left: 30px;
    cursor: pointer;
  }
}
</style>
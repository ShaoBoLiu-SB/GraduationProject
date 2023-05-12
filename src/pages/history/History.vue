<script lang="ts" setup>
// vue和pinia相关
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, toRaw, onUnmounted } from "vue";

// 第三方组件

// ts数据
import { zhouDynasty } from "@/stores/articles/zhouDynasty";
import { qinDynasty } from "@/stores/articles/qinDynasty";
import { hanDynasty } from "@/stores/articles/hanDynasty";
import { hanDynastySecound } from "@/stores/articles/hanDynastySecound";
import { hanDynastyThird } from "@/stores/articles/hanDynastyThird";
import { threeCountries } from "@/stores/articles/threeCountries";
import { twoJinDynasty } from "@/stores/articles/twoJinDynasty";
import { nanDynasty } from "@/stores/articles/nanDynasty";
import { suiDynasty } from "@/stores/articles/suiDynasty";
import { tangDynasty } from "@/stores/articles/tangDynasty";
import { tangDynastySecound } from "@/stores/articles/tangDynastySecound";
import { tangDynastyThird } from "@/stores/articles/tangDynastyThird";
import { mingDynasty1 } from "@/stores/articles/mingDynasty";
import { asideStore } from "@/stores/aside";

// Three.js相关
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import * as dat from "dat.gui";
import { gsap } from "gsap";
let overLay = ref(null);
const canvasBox = ref(null);

const zhouDynastyStore = zhouDynasty();
const qinDynastyStore = qinDynasty();
const hanDynastyStore = hanDynasty();
const hanDynastySecoundStore = hanDynastySecound();
const hanDynastyThirdStore = hanDynastyThird();
const threeCountriesStore = threeCountries();
const twoJinDynastyStore = twoJinDynasty();
const nanDynastyStore = nanDynasty();
const suiDynastyStore = suiDynasty();
const tangDynastyStore = tangDynasty();
const tangDynastySecoundStore = tangDynastySecound();
const tangDynastyThirdStore = tangDynastyThird();
const mingDynasty1Store = mingDynasty1();
const asideStoreData = asideStore();

const route = useRoute();
const router = useRouter();

const dynastyList = [
  qinDynastyStore,
  tangDynastyStore,
  mingDynasty1Store,
  hanDynastySecoundStore,
  hanDynastyThirdStore,
  threeCountriesStore,
  twoJinDynastyStore,
  nanDynastyStore,
  suiDynastyStore,
  tangDynastyStore,
  tangDynastySecoundStore,
  tangDynastyThirdStore,
];

// 一些数据
const overLayText = ref("loading"); //遮罩层文字
const particlesCount = 1000; //three.js场景中粒子数量
const positions = new Float32Array(particlesCount * 3); //粒子的位置数据；
const articleNum = ref(0);
let pid: any = null;
const dynastyArticle = () => {
  const pid = route.query.pid || 0;
  return dynastyList[pid as number];
};
const dynastyListData = dynastyArticle();
let originData = toRaw(dynastyListData.$state).articles;
let currentIntersect: any = null;

// 初始化three.js场景
function canvasInit() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机
  camera.position.set(0, 0.5, 5); //相机位置
  camera.aspect = window.innerWidth / window.innerHeight; //相机宽高比例
  camera.updateProjectionMatrix(); //更新相机投影矩阵，
  scene.add(camera);

  // 创建gui实例
  const gui = new dat.GUI();
  return { scene, camera, gui };
}

onMounted(() => {
  // console.log(dynastyListData.$state.target);
  pid = route.query.pid; //根据id获取文章
  let { scene, camera, gui } = canvasInit(); //初始化js场景
  const sceneGroup = new THREE.Group();
  const cameraGroup = new THREE.Group();
  scene.add(cameraGroup);
  camera.position.z = 30;
  cameraGroup.add(camera);
  // 书写加载进度功能
  /**
   * Overlay遮罩层
   */
  const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms: {
      uAlpha: { value: 1 },
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
    `,
  });
  const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
  scene.add(overlay);

  // 加载管理监视器
  const loadingManager = new THREE.LoadingManager(
    // 加载完毕loaded
    () => {
      // Wait a little
      window.setTimeout(() => {
        // Animate overlay
        gsap.to(overlayMaterial.uniforms.uAlpha, {
          duration: 3,
          value: 0,
          delay: 1,
        });

        // Update loadingBarElement
        overLay.value.classList.add("ended");
        overLay.value.style.transform = "";
        overLayText.value = "";
      }, 500);
    },
    // 加载中progress
    (itemUrl: any, itemsLoaded: any, itemsTotal: any) => {
      const progressRatio: Number = itemsLoaded / itemsTotal;
      console.log(itemsLoaded, itemsTotal);
      overLay.value.style.transform = `scaleX(${progressRatio})`;
    }
  );

  // 设置渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvasBox.value.appendChild(renderer.domElement);

  // 纹理加载器
  const textureLoader = new THREE.TextureLoader(loadingManager);
  // 字体加载器
  const fontLoader = new FontLoader(loadingManager);
  fontLoader.load("/public/smiley sans.json", (font: any) => {
    const fontGeometry1 = new TextGeometry(originData[0].title, {
      font,
      size: 1.5,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 5,
    });
    const fontGeometry2 = new TextGeometry(originData[1].title, {
      font,
      size: 1.5,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 5,
    });
    // fontGeometry1.computeBoundingBox();
    // fontGeometry2.computeBoundingBox();
    // fontGeometry1.translate(
    //   - fontGeometry1.boundingBox.max.x * 0.5
    //   - fontGeometry1.boundingBox.max.y * 0.5
    //   - fontGeometry1.boundingBox.max.z * 0.5
    // )
    // fontGeometry2.translate(
    //   - fontGeometry2.boundingBox.max.x * 0.5
    //   - fontGeometry2.boundingBox.max.y * 0.5
    //   - fontGeometry2.boundingBox.max.z * 0.5
    // )
    // fontGeometry1.translate(-fontGeometry1.boundingBox.max.x * 0.5)
    // fontGeometry2.translate(-fontGeometry2.boundingBox.max.x * 0.5)
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffee });
    const text1 = new THREE.Mesh(fontGeometry1, textMaterial);
    const text2 = new THREE.Mesh(fontGeometry2, textMaterial);
    text1.position.x = -7.81;
    text2.position.x = -7.81;
    text2.position.y = -30;
    text1.position.z = 2;
    text2.position.z = 2;

    // gui.add(text2.position, 'y').min(-40).max(0).step(0.01)
    sceneGroup.add(text1, text2);
  });

  // 创建粒子
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 100; //x
    positions[i * 3 + 1] = 1 * 0.5 - Math.random() * 4 * 20 + 10; //y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100; //z
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  const particlesMaterial = new THREE.PointsMaterial({
    color: "#ffeded",
    sizeAttenuation: textureLoader,
    size: 0.2,
  });
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // 限定一个章节只有两篇文章吧，不好控制实现效果了
  // 创建两个平面吧
  const texture1Src = originData[0].img;
  const texture2Src = originData[1].img;
  const texture1 = textureLoader.load(texture1Src);
  const texture2 = textureLoader.load(texture2Src);

  const planeGeometry = new THREE.PlaneGeometry(30, 20);
  const planeMaterial1 = new THREE.MeshBasicMaterial({
    map: texture1,
    side: THREE.DoubleSide,
  });
  const planeMaterial2 = new THREE.MeshBasicMaterial({
    map: texture2,
    side: THREE.DoubleSide,
  });
  const plane1 = new THREE.Mesh(planeGeometry, planeMaterial1);
  const plane2 = new THREE.Mesh(planeGeometry, planeMaterial2);
  scene.add(plane1, plane2);
  plane1.position.y = -0.28;
  plane2.position.y = -30;
  sceneGroup.add(plane1, plane2);
  scene.add(sceneGroup);

  // three.js时钟
  const clock = new THREE.Clock();
  let previousTime = 0; //记录上一次间隔时间
  const cursor = { x: 0, y: 0 }; // 记录一下鼠标位置
  // 鼠标移动改变相机位置（相机跟随鼠标）
  // 鼠标向量(供给射线投射器使用)
  const mouse = new THREE.Vector2();
  window.addEventListener("mousemove", (event) => {
    cursor.x = (event.clientX / window.innerWidth - 0.5) * 2;
    cursor.y = (event.clientY / window.innerHeight - 0.5) * 2;
    sceneGroup.rotation.y = cursor.x / 10;
    sceneGroup.rotation.x = cursor.y / 20;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });
  // 鼠标滚动,改变相机y轴方向
  let scrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  const raycaster = new THREE.Raycaster(); //射线投射器
  // currentIntersect = null //定义个变量(暂时没有投射到物体)
  canvasBox.value.addEventListener("click", () => {
    if (currentIntersect) {
      switch (currentIntersect.object) {
        case plane1:
          toArticle(0);
          break;
        case plane2:
          toArticle(1);
          break;
      }
    }
  });

  // 设置渲染器
  const render = () => {
    // 射线投射器检测,检测鼠标移动到哪个物体上
    raycaster.setFromCamera(mouse, camera); //设置射线投射器出发点为相机,聚焦点为鼠标
    const objectToTest = [plane1, plane2]; //把要检测的物体编程一个数组
    const intersects = raycaster.intersectObjects(objectToTest); // 检测碰到哪个物体了.
    let routePath = router.currentRoute.value.path;
    if (routePath != "/history") {
      asideStoreData.hoverDot(false);
      canvasBox.value.style.cursor = "default";
    }
    if (intersects.length) {
      if (!currentIntersect) {
        if (routePath == "/history") {
          asideStoreData.hoverDot(true);
          canvasBox.value.style.cursor = "pointer";
        }
      }
      currentIntersect = intersects[0];
    } else {
      if (currentIntersect) {
        asideStoreData.hoverDot(false);
        canvasBox.value.style.cursor = "default";
      }

      currentIntersect = null;
    }

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    // 鼠标运动相机
    camera.position.y = -(scrollY / window.innerHeight) * 40;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;
    cameraGroup.position.x +=
      (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y +=
      (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

    renderer.render(scene, camera); //渲染器渲染场景相机
    requestAnimationFrame(render);
  };
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false; //创建控制器并暂时禁止使用.
  // console.log(gui);
  gui.add(controls, "enabled");
  render();
});

onUnmounted(() => {
  currentIntersect = null;
});

// 根据路由传递过来的id, 展示对应的朝代文章列表
// var dynastyArticle = computed(() => {
//   const pid = route.query.pid || 0;
//   return dynastyList[(pid as number)]
// })

// 跳转到文章
function toArticle(id: number) {
  router.push({
    name: "article",
    query: { articleId: id, pid },
  });
}
</script>

<template>
  <div class="history">
    <!-- 遮挡遮罩 -->
    <div
      class="overLay"
      ref="overLay"
    >
      {{ overLayText }}
    </div>

    <div class="something"></div>
    <!-- three.js内容 -->
    <div
      id="canvasBox"
      ref="canvasBox"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.history {
  background-color: transparent;

  .something {
    height: 1400px;
    width: 100%;
    position: absolute;
    top: 0;
  }

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
    z-index: 999;
  }

  .overLay.ended {
    transform: scaleX(0);
    transition: all 1.5s ease-in-out;
  }

  .articleSection {
    margin: 100px auto 20px;
    height: 2000px;
    background-color: white;
    width: 70vw;
    display: flex;
    justify-content: space-between;
    // flex-wrap: wrap;

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
      background-color: transparent;
      transition: all 0.3s;
      border: 1px solid rgba(0, 0, 0, 0.1);

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
          background-color: rgb(255, 255, 255, 0.8);
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: all 0.3s;

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
        background-color: white;
        color: gray;

        &::before {
          content: "";
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

  #canvasBox {
    position: fixed;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
  }
}
</style>
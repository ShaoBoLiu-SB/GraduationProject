<script lang="ts" setup>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref, onMounted, onUnmounted } from 'vue'
import * as dat from 'dat.gui';
import { gsap } from 'gsap'
let firstPage = ref(null);
let overLay = ref(null);

// 一些变量
const overLayText = ref('loading');

onMounted(() => {
  const scene = new THREE.Scene();  //场景
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);  //相机
  const raycaster = new THREE.Raycaster();  //射线投射器
  const pointer = new THREE.Vector2();  //??啥东西? 
  const gui = new dat.GUI();

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper)




  // 设置相机位置
  camera.position.set(0, 0, 1);
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
      }, 500)
    },
    // 加载中progress
    (itemUrl: any, itemsLoaded: any, itemsTotal: any) => {
      const progressRatio: Number = itemsLoaded / itemsTotal;
      console.log(itemsLoaded, itemsTotal);
      overLay.value.style.transform = `scaleX(${progressRatio})`

    }
  )

  // 模型加载器
  const gltfLoader = new GLTFLoader(loadingManager);
  gltfLoader.load('/src/assets/model/buddha.glb', (gltf: any) => {
    const model = gltf.scene;
    // model.scale.set(1, .1, .1);
    // model.position.set(2.5, -.25, -1.4)
    model.position.set(-1.7, -0.75, -3)

    model.rotation.y = 1;
    scene.add(model);


    // gui.add(model.position, 'x').max(5).min(-3).step(.01)
    // gui.add(model.position, 'y').max(5).min(-3).step(.01)
    // gui.add(model.position, 'z').max(5).min(-3).step(.01)
    // gui.add(model.rotation, 'y').max(20).min(0).step(.0001)


  })

  gltfLoader.load('/src/assets/model/testCoin.glb', (gltf: any) => {
    const coin = gltf.scene;
    // scene.add(coin);
  })

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  // 设置渲染器大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0xffffff, 1);
  renderer.shadowMap.enabled = true;
  // 将渲染器添加到页面
  firstPage.value.appendChild(renderer.domElement);

  //添加控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  // controls.enabled = false;
  // 设置控制器阻尼
  // controls.enableDamping = true;

  // 添加环境灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
  scene.add(ambientLight);

  // 添加直射光
  const directionLight = new THREE.DirectionalLight(0xffffff, 1);
  directionLight.position.set(0, 2, 3);
  // scene.add(directionLight)




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

onUnmounted(() => {

})

</script>

<template>
  <!-- 遮挡遮罩 -->
  <div class="overLay" ref="overLay">
    {{ overLayText }}
  </div>
  <div class="section" ref="firstPage">

  </div>
</template>

<style lang="scss" scoped>
.overLay {
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
  line-height: 50px;
  line-height: 100px;
  font-size: 25px;
  font-weight: 700;
}

.overLay.ended {
  transform: scaleX(0);
  transition: all 1.5s ease-in-out;
}
</style>
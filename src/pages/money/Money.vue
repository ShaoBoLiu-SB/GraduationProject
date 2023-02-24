<script lang="ts" setup>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref, onMounted, onUnmounted } from 'vue'
import * as dat from 'dat.gui';
let firstPage = ref(null);

onMounted(() => {
  const scene = new THREE.Scene();  //场景
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);  //相机
  const raycaster = new THREE.Raycaster();  //射线投射器
  const pointer = new THREE.Vector2();  //??啥东西? 
  const gui = new dat.GUI();

  const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper)


  // 设置相机位置
  camera.position.set(0, 0, 1);
  // 设置相机视图比例
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵,类似blender应用缩放
  camera.updateProjectionMatrix();
  scene.add(camera);


  const gltfLoader = new GLTFLoader();
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
  controls.enabled = false;
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
  <div class="section" ref="firstPage">

  </div>
</template>

<style lang="scss" scoped></style>
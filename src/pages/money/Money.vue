<script lang="ts" setup>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref, onMounted } from 'vue'
let firstPage = ref(null);

onMounted(() => {
  const scene = new THREE.Scene();  //场景
  const camera = new THREE.PerspectiveCamera(90, 1, 0.1, 1000);  //相机
  const raycaster = new THREE.Raycaster();  //射线投射器
  const pointer = new THREE.Vector2();  //??啥东西?

  // 投射器相关函数,检测鼠标在canvas里面的投射,用来检测鼠标选择到哪些物体了
  function onPointerMove(event:MouseEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }

  // 设置相机位置
  camera.position.set(0, .3, 1);
  // 设置相机视图比例
  camera.aspect = (window.innerWidth - 250) / window.innerHeight;
  // 更新相机投影矩阵,类似blender应用缩放
  camera.updateProjectionMatrix();
  scene.add(camera);


  const gltfLoader = new GLTFLoader();
  gltfLoader.load('/src/assets/model/moduel.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(.1, .1, .1);
    scene.add(model);
  })

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  // 设置渲染器大小
  renderer.setSize(window.innerWidth - 250, window.innerHeight);
  renderer.setClearColor(0xffffff, 1);
  renderer.shadowMap.enabled = true;
  // 将渲染器添加到页面
  firstPage.value.appendChild(renderer.domElement);

  //添加控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  // 设置控制器阻尼
  controls.enableDamping = true;

  // 添加灯光
  const light = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(light);

  // 渲染函数
  const render = () => {

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      // intersects[i].object.material.color.set(0xff0000);
      console.log(intersects[i]);
      
    }


    // 更新控制器
    controls.update();
    // 渲染场景
    renderer.render(scene, camera);
    // 循环渲染
    requestAnimationFrame(render);
  }
  window.addEventListener('pointermove', onPointerMove);
  render();

})

</script>

<template>
  <div class="section" ref="firstPage">

  </div>

</template>

<style lang="scss" scoped>

</style>
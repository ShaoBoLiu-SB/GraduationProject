import { createApp } from 'vue'
import './style.css'  //这里是格式化css文件
import router from '@/router/index'
import App from './App.vue'
// 引入一下 elementd的样式
import 'element-plus/dist/index.css'  //引入element的css文件,要不然element的组件是没有样式的
const app = createApp(App)

// 注册使用pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
// 引入一下element plus的全局配置(主要是配置组件大小和z-index)
import ElementPlus from 'element-plus'


app.use(router).use(pinia).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')

import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/home/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home/Home.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/pages/history/History.vue')
  },
  {
    path:'/money',
    name:'money',
    component:() => import('@/pages/money/Money.vue')
  },
  {
    path:'/article',
    name:'article',
    component:() => import('@/components/article/article.vue')
  },
  {
    path:'/testpage',
    name:'testpage',
    component:() => import('@/pages/testpage/testpage.vue')
  }
]

export default routes
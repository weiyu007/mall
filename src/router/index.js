import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Fenlei = () => import('../views/fenlei/Fenlei')
const Gwc = () => import('../views/gwc/Gwc')
const Wode = () => import('../views/wode/Wode')
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)

const routes = [{
    path: "",
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/fenlei',
    component: Fenlei
  },
  {
    path: '/gwc',
    component: Gwc
  },
  {
    path: '/wode',
    component: Wode
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

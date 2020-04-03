import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
// 原理：Home被赋值成一个函数，当其成为活跃路由时，Home被调用，返回import的内容
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const LorR = () => import('views/lorr/LorR')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid', // 动态路由给path添加id
    component: Detail
  },
  {
    path: '/lorr',
    component: LorR
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

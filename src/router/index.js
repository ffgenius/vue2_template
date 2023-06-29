import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getToken } from '@/utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
let routerReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      // 用户已登录，直接跳转到根路径或其他合适的页面
      next({ path: '/' })
    } else {
      // 用户已登录，正常进行路由导航
      next()
    }
  } else {
    // 用户未登录，跳转到登录页面
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${ to.fullPath }`)
    }
  }
})

export default router

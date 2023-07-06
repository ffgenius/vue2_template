import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import request from '@/utils/request'

Vue.config.productionTip = false
Vue.prototype.$request = request

Vue.use(ElementUI)

new Vue({
  router,
  store,
  beforeCreate() {
    // 安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')

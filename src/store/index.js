import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user"
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  //引用 vuex-persistedState 对 state 数据持久化
  plugins: [
    // 只要调用 vuex 时，才会进行持久化操作。
    persistedState({
      // 存储方式
      storage: window.sessionStorage,
      // 存储 key
      key: 'vuex_test',
      // 存储模块
      paths: ["user"]
    })
  ]
})

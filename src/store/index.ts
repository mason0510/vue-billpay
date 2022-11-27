import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// @ts-ignore
import api from '../api';
const { getUserInfo } = api
// 调试,开发模式开启严格模式，修改state必须使用mutations提交的方式
const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    userInfo: null
  },
  getters: {
    userInfo: state => state.userInfo
  },
  mutations: {
    setUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then((res: { data: any; }) => {
            const data = res.data
            commit('setUserInfo', data)
            resolve(data)
          }).catch((err: any) => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  modules: {
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

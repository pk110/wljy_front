import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import future from './modules/future'
import lives from './modules/lives'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      
  },
  getters: {
      
  },
  mutations: {
      
  },
  actions: {
      
  },
  modules: {
    index:index,
    future:future,
    lives:lives
  }
})

export default store
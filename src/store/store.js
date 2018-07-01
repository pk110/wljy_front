import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import future from './modules/future'
import lives from './modules/lives'
import news from './modules/news'
import vedioes from './modules/vedioes'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    imgShow:true,
    error:1,  //请求失败
    isBottom:1  //什么时候不需要底部
  },
  getters: {
    
  },
  mutations: {
    showImg:(state)=>{
      state.imgShow = true
    },
    hiddenImg:(state)=>{
      state.imgShow = false
    }
  },
  actions: {    
    showImg:({commit}) =>{
      commit('showImg')
    },
    hiddenImg:({commit}) =>{
      commit('hiddenImg')
    }
  },
  modules: {
    index:index,
    future:future,
    lives:lives,
    news:news,
    vedioes:vedioes
  }
})

export default store
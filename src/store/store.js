import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import future from './modules/future'
import lives from './modules/lives'
import news from './modules/news'
import vedioes from './modules/vedioes'
import my from './modules/my'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    imgShow:true,
    showLogin:false, //静默登陆界面
    error:1,  //请求失败
    isBottom:1,  //什么时候不需要底部
    user_id:0,  //进入微信登陆入库到用户表里对应的用户id
    status:0,  //判断用户是否绑定了手机号  0 未绑定 1绑定
    cartsNumber:0,  //用户购物车数量
    username:'zy', //用户名
    myPhone:''  //用户手机号
  },
  getters: {
    
  },
  mutations: {
    showImg:(state)=>{
      state.imgShow = true
    },
    hiddenImg:(state)=>{
      state.imgShow = false
    },
    showLogin:(state)=>{
      state.showLogin = true
    }
  },
  actions: {  
    //显示加载组件gif图片  
    showImg:({commit}) =>{
      commit('showImg')
    },
    //隐藏加载组件gif图片
    hiddenImg:({commit}) =>{
      commit('hiddenImg')
    },
    // 显示登录界面
    showLogin:({commit}) =>{
      commit('showLogin')
    }
  },
  modules: {
    index:index,
    future:future,
    lives:lives,
    news:news,
    vedioes:vedioes,
    my:my
  }
})

export default store
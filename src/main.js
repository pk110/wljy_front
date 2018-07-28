// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
"use strict"
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {post,fetch,patch,put} from './http/http'
import {getCookie,setCookie,delCookie,stamp} from './utils/utils'
import store from './store/store'
import {Dialog,Lazyload,Field,Toast,List,Cell,CellGroup,SubmitBar,PullRefresh,NavBar,Card,NumberKeyboard,Checkbox, CheckboxGroup,Tab, Tabs,GoodsAction,GoodsActionBigBtn,GoodsActionMiniBtn} from 'vant';
const error = require('./assets/png_error.png')
const loading = require('./assets/loading_img.gif')

Vue.use(Dialog).use(Field).use(SubmitBar).use(GoodsAction).use(Card).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Checkbox).use(CheckboxGroup).use(NumberKeyboard).use(NavBar).use(PullRefresh).use(Cell).use(CellGroup).use(List).use(Tab).use(Tabs).use(Lazyload,{
  loading:loading,
  error:error,
  preload:'0.3',
  attempt:1,    
  lazyComponent:true
});
Vue.config.productionTip = false

// 根地址   http://192.168.42.2:3000  http://192.168.56.1:3000
axios.defaults.baseURL = 'http://localhost:3000/front/api';

// 全局调用
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$store = store;
Vue.prototype.$stamp = stamp;
Vue.prototype.$Toast = Toast;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

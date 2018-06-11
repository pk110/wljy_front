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
import { Toast } from 'vant'
import { Lazyload } from 'vant';

Vue.use(Lazyload,{
  loading:'./assets/png_error.png',
  error:'./assets/png_error.png',
  lazyComponent:true
});
Vue.config.productionTip = false

// 根地址   http://192.168.42.2:3000  http://192.168.56.1:3000
axios.defaults.baseURL = 'http://localhost:3000';

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
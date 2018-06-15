<template>
  <div id="app">
    <router-view />
    <img :src="loadingImg" v-if="showImg" class="loadingImg" /> 
    <!--底层公共部分-->
    <van-tabbar v-model="active" style="backgound-color:#f8f8f8;border-top:1px solid #eee">
      <van-tabbar-item v-for="item in routerList" :key="item.name" :to="item.path">
        <span>{{item.name}}</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? item.icon.active : item.icon.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
const future = require('./assets/future.png')
const future_active = require('./assets/future_active.png')
const index = require('./assets/index.png')
const index_active = require('./assets/index_active.png')
const my = require('./assets/my.png')
const my_active = require('./assets/my_active.png')
const loadingImg = require('./assets/loading.gif')

export default {
    data () {
        return {
          loadingImg,
          routerList:[
            {
              name:'首页',
              path:'/index',
              icon: {
                normal: future,
                active: future_active
              }
            },{
              name:'未来',
              path:'/Future/vedioes',
              icon: {
                normal: index,
                active: index_active
              }
            },{
              name:'我的',
              path:'/My',
              icon: {
                normal: my_active,
                active: my
              }
            }
          ]
        }
    },
    methods:{
      
    },
    computed: {
      showImg(){
        return this.$store.state.imgShow
      },
      active:{
          get:function(){
            return this.$store.state.index.active
          },
          set:function(){
              
          }
      }
    },
    components: {
      "van-tabbar":Tabbar,
      "van-tabbar-item":TabbarItem
    },
    created(){
      
    },
    watch: {
      $route(to, from) {  
          if(to.fullPath == '/index'){
            this.$store.state.index.active = 0
          }else if(to.fullPath == '/Future/vedioes'){
            this.$store.state.index.active = 1
          }else if(to.fullPath == '/My'){
            this.$store.state.index.active = 2
          }
      } 
    }
}
</script>

<style>
  /*css初始化*/
  body,dl,dd,ul,ol,h1,h2,h3,h4,h5,h6,pre,form,input,textarea,p,hr,thead,tbody,tfoot,th,td{margin:0;padding:0;}
  ul,ol{list-style:none;}
  a{text-decoration:none;}
  html{-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none; height: 100%; overflow: scroll;}
  body{line-height:1.5; font-size:14px; height: 100%;}
  body,button,input,select,textarea{font-family:'helvetica neue',tahoma,'hiragino sans gb',stheiti,'wenquanyi micro hei',\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;}
  b,strong{font-weight:bold;}
  i,em{font-style:normal;}
  table{border-collapse:collapse;border-spacing:0;}
  table th,table td{border:1px solid #ddd;padding:5px;}
  table th{font-weight:inherit;border-bottom-width:2px;border-bottom-color:#ccc;}
  img{border:0 none;width:auto\9;max-width:100%;vertical-align:top; height:auto;}
  button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;vertical-align:baseline;}
  button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;}
  button[disabled],input[disabled]{cursor:default;}
  input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;}
  input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
  input[type="search"]::-webkit-search-decoration{-webkit-appearance:none;}
  input:focus{outline:none;}
  select[size],select[multiple],select[size][multiple]{border:1px solid #AAA;padding:0;}
  article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block;}
  audio,canvas,video,progress{display:inline-block;}
  body{background:#eee;}
  input::-webkit-input-speech-button {display: none}
  button,input,textarea{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }  
  .van-tabbar-item--active{
    color:#d8a863;
  }
  .loadingImg{
    width: 3rem;
    margin: 0 auto;
    margin-top: 3.5rem;
    display: block;
  }
</style>

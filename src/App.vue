<template>
  <div id="app">
    <!--<div @click="addLogin">弹出登录</div>-->

    <router-view v-if="error == 1"/>
    <!--请求数据失败动画-->
    <img :src="errorImg" v-else class="loadingImg" />
    <!--加载动画-->
    <img :src="loadingImg" v-if="showImg" class="loadingImg" /> 
    <!--底层公共部分-->
    <van-tabbar v-if="isBottom == 1" v-model="active" style="backgound-color:#f8f8f8;border-top:1px solid #eee">
      <van-tabbar-item v-for="item in routerList" :key="item.name" :to="item.path">
        <span>{{item.name}}</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? item.icon.active : item.icon.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <div v-else></div>
    <!--登录界面 微信静默登录-->
    <transition  name="sideUp">
      <Login v-if="showLogin"></Login>
    </transition>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import Login from './pages/login/login'
// const future = require('./assets/future.png')
// const future_active = require('./assets/future_active.png')
// const index = require('./assets/index.png')
const index_active = require('./assets/index_active.png')
// const my = require('./assets/my.png')
// const my_active = require('./assets/my_active.png')
const loadingImg = require('./assets/loading.gif')
const errorImg = require('./assets/404.png')

export default {
    data () {
        return {
          loadingImg,
          errorImg,
          routerList:[
            // {
            //   name:'首页',
            //   path:'/index',
            //   icon: {
            //     normal: future,
            //     active: future_active
            //   }
            // },{
            //   name:'未来',
            //   path:'/Future/vedioes',
            //   icon: {
            //     normal: index,
            //     active: index_active
            //   }
            // },{
            //   name:'我的',
            //   path:'/My',
            //   icon: {
            //     normal: my_active,
            //     active: my
            //   }
            // }
            {
              name:'首页',
              path:'/index',
              icon: {
                normal: index_active,
                active: index_active
              }
            },{
              name:'未来',
              path:'/Future/vedioes',
              icon: {
                normal: index_active,
                active: index_active
              }
            },{
              name:'我的',
              path:'/My',
              icon: {
                normal: index_active,
                active: index_active
              }
            }
          ]
        }
    },
    methods:{
      // addLogin(){
      //   this.$store.dispatch('showLogin')
      // }
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
      },
      showLogin:{
        get:function(){
          return this.$store.state.showLogin
        },
        set:function(){

        }
      },
      error(){
        return this.$store.state.error
      },
      isBottom(){
        return this.$store.state.isBottom
      },
      insertUser(){
        let user = new Promise((resolve,reject) =>{
          const data = {
            name:this.$store.state.username,
            sex:1,
            userImg:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4089992707,3524618747&fm=27&gp=0.jpg'
          }
          this.$post('/register',data)
              .then((res)=>{ 
                  this.$stamp(null,res)
                  if(res.code == 200){
                    this.$store.state.user_id = res.data.user_id
                    this.$store.state.status = res.data.status
                    resolve(res.data.user_id)
                  }else{
                    this.$Toast(res.message)
                  } 
              })
              .catch((res) =>{
                  console.log(res)
          })
        })
        return user
      }
      // historyWatch () {
      //   this.news = (this.$route.path === '/new' ? 1 : 0);
      // }
    },
    components: {
      "van-tabbar":Tabbar,
      "van-tabbar-item":TabbarItem,
      "Login":Login
    },
    created(){
      //微信静默登陆入口
      // 如果是新用户则入库 把this.$store.state.user_id改变，否则就要改变查询是否绑定了this.$store.state.status的状态
      this.insertUser.then((data) =>{
        //获取当前用户购物车的数量
        this.$post('/getCartsNumber',{'user_id':data})
            .then((res)=>{ 
                this.$stamp(null,res)
                if(res.code == 200){
                  this.$store.state.cartsNumber = res.data.cartsNumber
                }else{
                  this.$Toast(res.message)
                } 
            })
            .catch((res) =>{
                console.log(res)
        })
      })
    },
    watch: {
      // // 路由若是发生变化，会再次执行该方法  还可以这种写法
      // '$route': 'historyWatch';
      $route(to, from) {  
          if(to.fullPath == '/index'){
            this.$store.state.index.active = 0
          }else if(to.fullPath == '/Future/vedioes'){
            this.$store.state.index.active = 1
            this.$store.state.future.active = 1
          }else if(to.fullPath == '/Future/lives'){
            this.$store.state.index.active = 1
            this.$store.state.future.active = 0
          }else if(to.fullPath == '/Future/news'){
            this.$store.state.index.active = 1
            this.$store.state.future.active = 2
          }else if(to.fullPath == '/My'){
            this.$store.state.index.active = 2
          }
          this.$store.state.isBottom = 1 
          this.$store.state.error = 1
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
  div{
    font-size: 0.12rem;
  }
  .van-tabbar-item--active{
    color:#d8a863;
  }
  .loadingImg{
    width: 3rem;
    margin: 0 auto;
    padding-top: 3.5rem;
    display: block;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .sideUp-enter-to, .sideUp-leave-to{
      transition: transform 0.3s
  }
  .sideUp-enter, .sideUp-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform:translate3d(0,100%,0)
  }
  .noComment{
    width:100%;
    text-align:center;
    margin-top: 0.4rem;
  }
  /*.commentNews_content .van-hairline--top-bottom::after{
    border-width:0;
  }*/
  :global(.van-hairline--top-bottom::after){
    border-width:0;
  }
  .van-button--bottom-action{
    font-size:0.16rem;
  }
  .van-pull-refresh{
    height:100%;
  }
</style>

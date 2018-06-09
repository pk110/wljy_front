<template>
  <div>
    <router-view />
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
const future = require('./../../assets/future.png')
const future_active = require('./../../assets/future_active.png')
const index = require('./../../assets/index.png')
const index_active = require('./../../assets/index_active.png')
const my = require('./../../assets/my.png')
const my_active = require('./../../assets/my_active.png')

export default {
    data () {
        return {
          active: 0,
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
              path:'/Future',
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
    
    },
    components: {
      "van-tabbar":Tabbar,
      "van-tabbar-item":TabbarItem
    },
    created(){
      
    }
}
</script>
<style lang="">
  .van-tabbar-item--active{
    color:#d8a863;
  }
</style>
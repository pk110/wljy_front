<template>
  <div>
    <van-tabs :line-width="lineWidth" v-model="active" sticky swipeable :swipe-threshold='swipeThreshold'>
        <van-tab v-for="item in futureList" :title="item.name" :key="item.name">
            <router-view />
        </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import { Tab, Tabs } from 'vant'

  export default {
      data () {
          return {
              lineWidth:60,
              swipeThreshold:3,
              // active:this.$store.state.future.active,
              futureList:this.$store.state.future.futureList
          }
      },
      methods:{
          
      },
      computed: {
        active:{
          get:function(){
            return this.$store.state.future.active
          },
          set:function(a){
            if(a == 0){
                this.$router.push('/Future/lives')
            }else if(a == 1){
                this.$router.push('/Future/vedioes')
            }else if(a == 2){
                this.$router.push('/Future/news')
            }
          }
        }
      },
      components: {
          'van-tabs':Tabs,
          'van-tab':Tab
      },
      created(){
          
      }
      // ,
      // watch: {
      //     'active'(a) {
      //   console.log(a)
      //       if(a == 0){
      //           this.$router.push('/Future/lives')
      //       }else if(a == 1){
      //           this.$router.push('/Future/vedioes')
      //       }else if(a == 2){
      //           this.$router.push('/Future/news')
      //       }
      //     } 
      // }
  }
  </script>
  <style lang="">
    .van-tab--active{
        color:#d8a863;
    }
    .van-tabs__line{
        background-color:#d8a863;
    }
  </style>
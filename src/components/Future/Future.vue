<template>
  <div class="topToggle">
    <van-tabs :line-width="lineWidth" v-model="active" sticky swipeable :swipe-threshold='swipeThreshold'>
        <van-tab v-for="item in futureList" :title="item.name" :key="item.id">
            <router-view />
        </van-tab>
    </van-tabs>
  </div>
</template>
<script>

  export default {
      data () {
          return {
              lineWidth:60,
              swipeThreshold:3,
              active:this.$store.state.future.active
          }
      },
      methods:{
          
      },
      computed: {
        futureList(){
          return this.$store.state.future.futureList
        }
        // ,
        // active:{
        //   get:function(){
        //     return this.$store.state.future.active
        //   },
        //   set:function(){

        //   }
        // }
      },
      components: {
        
      },
      created(){
          
      },
      watch: {
        'active'(a) {
          if(a == 0){
              this.$router.push('/Future/lives')
          }else if(a == 1){
              this.$router.push('/Future/vedioes')
          }else if(a == 2){
              this.$router.push('/Future/news')
          }
          this.$store.state.future.active = a
        }
      }
    }
  </script>
  <style lang="">
    .van-tab--active{
        color:#d8a863;
    }
    .van-tabs__line{
        background-color:#d8a863;
    }
    .topToggle{
      position:fixed;
      top:0;
      width:100%;
      z-index:9999;
    }
  </style>
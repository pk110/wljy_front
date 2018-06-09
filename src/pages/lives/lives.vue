<template>
  <div class="lives">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul>
            <li v-for="item in lives" :key="item.title">
                <img class="lives_img" :src="item.image" :alt="item.title">
                <p class="lives_title">{{item.title}}</p>
                <p class="lives_people">{{item.people}}人已购买</p>
                <div class="lives_bottom">
                    <div class="lives_bottom_left">
                        <img src="" alt="">
                        <span :class="item.specialMoney !== null?'lives_bottom_left_specialMoney':'lives_bottom_left_money'">23元</span>
                        <span class="lives_bottom_left_money" style="padding-left:5px">{{item.specialMoney !== null?item.specialMoney+'元':null}}</span>
                    </div>
                    <div>{{item.time}}</div>
                </div>
            </li>
        </ul>
    </van-pull-refresh>
  </div>
</template>
<script>
   import { PullRefresh } from 'vant' 

    export default {
        data () {
            return {
                lives:this.$store.state.lives.lives
            }
        },
        methods:{
            onRefresh(){
                setTimeout(() => {
                    this.$store.state.lives.isLoading = false;
                }, 500);
            }
        },
        computed: {
            isLoading(){
               return this.$store.state.lives.isLoading
            }
        },
        components: {
            'van-pull-refresh':PullRefresh
        },
        created(){
        
        }
    }
</script>
<style lang="">
  .lives{
      box-sizing:border-box;
      padding:0 15px;
  }
  .lives ul li{
      width:2.8693rem;
      float:left;
      font-size:0.12rem;
      color:#ddd;
      margin-bottom:0.15rem;
  }
  .lives ul li:nth-child(2n){
      margin-left:0.15rem;
  }
  .lives_img{
      width:100%;
      height:1.7rem;
      border-radius:10px;
  }
  .lives_title{
      width:100%;
      padding:5px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color:#000;
  }
  .lives_people{
      text-align:right;
  }
  .lives_bottom{
      width:100%;
      padding:5px 0;
      display:flex;
      justify-content:space-between;
  }
  .lives_bottom_left{
      display:flex;
      justify-content:flex-start;
  }
  .lives_bottom_left_money{
      color:#d8a863;
  }
  .lives_bottom_left_specialMoney{
      text-decoration:line-through;
      color:#d8a863;
  }
</style>
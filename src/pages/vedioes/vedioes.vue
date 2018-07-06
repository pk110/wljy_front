<template>
  <div class="vedioes">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul>
            <li v-for="(item,index) in vedioes" :key="index">
              <router-link :to="{path:'/Future/vedioes/'+item.id,params:{id:item.id}}">
                <img class="vedioes_img" :src="item.image" :alt="item.title" v-lazy="item.image">
                <p class="vedioes_title">{{item.title}}</p>
                <p class="vedioes_people">{{item.people}}人已购买</p>
                <div class="vedioes_bottom">
                    <div class="vedioes_bottom_left">
                        <img class="vedioes_img_money" src="./../../assets/money.png" :alt="item.title">
                        <span :class="item.specialMoney !== 0?'vedioes_bottom_left_specialMoney':'vedioes_bottom_left_money'">{{item.money}}元</span>
                        <span class="vedioes_bottom_left_money" style="padding-left:5px;color:red">{{item.specialMoney !== 0?item.specialMoney+'元':(item.money == 0?'免费':item.money+'元')}}</span>
                    </div>
                    <div class="vedioes_time">{{item.time}}</div>
                </div>
              </router-link>
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
              isLoading: false 
            }
        },
        methods:{
            onRefresh(){
                setTimeout(() => {
                    this.getVedioesList()
                    this.isLoading = false;
                }, 500);
            },
            //   获取直播列表页
            getVedioesList(){
              this.$post('/vedioesList')
                  .then((res)=>{ 
                      this.$stamp(null,res)
                      if(res.code == 200){
                          this.$store.dispatch('getVedioesList',res.data)
                      }else{
                          this.$Toast('网络错误!')
                      } 
                  })
                  .catch((res) =>{
                      console.log(res)
              })
            }
        },
        computed: {
            vedioes(){
               return this.$store.state.vedioes.vedioes
            }
        },
        components: {
            'van-pull-refresh':PullRefresh
        },
        created(){
            if(this.$store.state.vedioes.vedioes == 0){
                this.getVedioesList()
            }
        }
    }
</script>
<style lang="">
  .vedioes{
      box-sizing:border-box;
      padding:0 15px;
      margin-top:15px;
  }
  .vedioes ul li{
      width:2.8693rem;
      float:left;
      font-size:0.12rem;
      color:#ddd;
      margin-bottom:0.15rem;
  }
  .vedioes ul li:nth-child(2n){
      margin-left:0.15rem;
  }
  .vedioes_img{
      width:100%;
      height:1.7rem;
      border-radius:10px;
  }
  .vedioes_title{
      width:100%;
      padding:5px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color:#000;
  }
  .vedioes_people{
      text-align:right;
      color:#000;
  }
  .vedioes_time{
      color:#ccc;
  }
  .vedioes_bottom{
      width:100%;
      padding:5px 0;
      display:flex;
      justify-content:space-between;
  }
  .vedioes_bottom_left{
      display:flex;
      align-items:center;
      justify-content:flex-start;
  }
  .vedioes_bottom_left_money{
      color:#d8a863;
  }
  .vedioes_bottom_left_specialMoney{
      text-decoration:line-through;
      color:#d8a863;
  }
  .vedioes_img_money{
    width:0.2rem;
    height:0.2rem;
    padding-right:0.1rem;
  }
</style>
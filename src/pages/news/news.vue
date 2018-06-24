<template>
  <div class="news_container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul class="news">
          <li v-for="item in news" :key="item.title">
            <router-link :to="{path:'/Future/news/'+item.news_id,params:{news_id:item.news_id}}">
              <div class="author">
                —— <img class="headImage" :src="item.headImage" :alt="item.title" /><span>{{item.author}}</span> ——
              </div>
              <img class="news_img" :src="item.image" :alt="item.title" v-lazy="item.image" />
              <div class="title">{{item.title}}</div>
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
      onRefresh() {
        setTimeout(() => {
          this.getNewsList()
          this.isLoading = false;
        }, 500);
      },
      //   获取新闻列表页
      getNewsList(){
          this.$post('/newsList')
              .then((res)=>{ 
                  this.$stamp(null,res)
                  if(res.code == 200){
                      this.$store.dispatch('getNewsList',res.data)
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
      news(){
        return this.$store.state.news.news
      }
    },
    components: {
      'van-pull-refresh':PullRefresh
    },
    created(){
      if(this.$store.state.news.news.length == 0){
        this.getNewsList()
      }
    }
}
</script>
<style lang="">
  .news_container{
    background-color:#eee;
    margin-top:0px!important;
  }
  .news{
    box-sizing:border-box;
    padding:0 15px;
    overflow-y:scroll;
  }
  .news li{
    background-color:#fff;
    margin:15px 0;
  }
  .author{
    box-sizing:border-box;
    padding:15px;
    text-align:center;
    color:#d8a863;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .author span{
    color:gray;
  }
  .title{
    box-sizing:border-box;
    padding:15px;
    color:#000;
  }
  .news_img{
    width:100%;
    height:3rem;
  }
  .headImage{
    width:20px;
    height:20px;
    border-radius:50%;
    margin:0 5px;
  }
</style>
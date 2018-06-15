<template>
  <div class="lives_container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul class="lives">
          <li v-for="item in lives" :key="item.title">
            <div class="img" v-lazy:background-image="item.image">
              <div class="img_content">
                <span>{{item.author}}</span>
                <div class="img_content_right">
                    <img class="lives_hot_img" src="./../../assets/hot.png" :alt="item.author" />
                    <span>{{item.hot}}</span>
                </div>
              </div>
            </div>
            <div class="lives_title">{{item.title}}</div>
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
          this.getLivesList()
          this.isLoading = false;
        }, 500);
      },
      //   获取新闻列表页
      getLivesList(){
          this.$post('/livesList')
              .then((res)=>{ 
                  this.$stamp(null,res)
                  if(res.code == 200){
                      this.$store.dispatch('getLivesList',res.data)
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
      lives(){
        return this.$store.state.lives.lives
      }
    },
    components: {
      'van-pull-refresh':PullRefresh 
    },
    created(){
      this.getLivesList()
    }
}
</script>
<style lang="">
  .lives_container{
    margin-top:0!important;
  }
  .lives li{
    width:49%;
    float:left;
    margin-top:0;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
  }
  .lives li:nth-child(2n){
    margin-left:2%;
  }
  .img{
    position:relative;
    width:100%;
    height:1.8rem;
    background-size:cover;
  }
  .lives_title{
    box-sizing:border-box;
    padding:4px 15px;
    width:100%;    
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow:hidden;
  }
  .img_content{
    position:absolute;
    bottom:0.15rem;
    width:100%;
    box-sizing:border-box;
    padding:0 0.15rem;
    display:flex;
    align-items:center;
    justify-content:space-between;
    color:#fff;
    font-size:0.14rem;
  }
  .img_content_right{
    display:flex;
    align-items:center;
    justify-content:flex-end;
  }
  .lives_hot_img{
    width:0.25rem;
    height:0.25rem;
    padding-right:0.1rem;
  }
</style>

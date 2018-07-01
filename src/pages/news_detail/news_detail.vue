<template>
  <div class="news_detail">
    <h1>{{news_detail.title}}</h1>
    <div class="authorMessage">
      <div class="author_detail">
        <img :src="news_detail.headImage" alt="">
        <span>{{news_detail.author}}</span>
      </div>
      <span>{{news_detail.time}}</span>
    </div>
    <img :src="news_detail.image" />
    <p>{{news_detail.content}}</p>
    <ul class="news_comments comments_bottom">
      <li v-for="item in news_detail.comments" :key="item.comment_name">
        <img class="news_comment_img" :src="item.comment_userImg" alt="">
        <div class="news_comment">
          <p style="color:gray">{{item.comment_name}}</p>
          <p>{{item.comment_content}}</p>
          <ul>
            <li class="news_reply" v-for="items in item.new_replys">
              <span style="color:blue">{{items.re_name}}</span>评论<span style="color:blue">{{items.re_to_name}}</span>:<span>{{items.re_content}}</span>
            </li>
          </ul>
          <p class="comments_time">{{item.time}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
    data () {
        return {
          
        }
    },
    methods:{
      //   获取新闻详情页信息
      getNews_detail(news_id){
        const data = {
          news_id:news_id,
          topic_type:3
        }
        this.$post('/newsList_detail',data)
            .then((res)=>{ 
                this.$stamp(null,res)
                if(res.code == 200){
                    this.$store.dispatch('getNews_detail',res.data)
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
      news_detail:{
        get:function(){
          return this.$store.state.news.news_detail
        },
        set:function(){

        }
      }
    },
    components: {
      
    },
    created(){
      this.$stamp(null,this.$route.params.id)
      this.getNews_detail(this.$route.params.id)
    }
}
</script>
<style lang="">
  .news_detail{
    box-sizing:border-box;
    padding:10px 15px;
    background-color:#fff;
  }
  .news_detail ul{
    margin-top:0.15rem;
  }
  .authorMessage{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0.15rem 0;
  }
  .comments_time{
    margin-top:0.1rem;
    color:#ccc;
  }
  .author_detail{
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .author_detail img{
    width:0.3rem;
    height:0.3rem;
    padding-right:0.05rem;
    border-radius:50%;
  }
  .news_comments li{
    width:100%;
    display:flex;
  }
  .comments_bottom{
    margin-bottom:0.8rem;
  }
  .news_comment_img{
    width:0.5rem;
    height:0.5rem;
    margin-top:0.3rem;
    margin-right:0.15rem;
    border-radius:50%;
  }
  .news_comment{
    box-sizing:border-box;
    padding:0.15rem 0;
    flex:1;
    border-top:1px solid #ccc;
  }
  .news_reply{
    background-color:#eee;
    box-sizing: border-box;
    padding: 4px;
  }
</style>
<template>
  <div class="news_detail">
    <h1>{{news_detail.title}}</h1>
    <div class="authorMessage">
      <div class="author_detail">
        <img :src="news_detail.headImg" alt="">
        <span>{{news_detail.author}}</span>
      </div>
      <span>{{news_detail.time}}</span>
    </div>
    <img :src="news_detail.image" />
    <p>{{news_detail.content}}</p>
    <div class="news_detail_attention">
      <div v-if="news_detail.status == 0" class="news_detail_attention_add" @click="attention(news_detail.id,3)">+ 收藏</div>
      <div v-else class="news_detail_attention_cancel" @click="cancelAttention(news_detail.id,3)">已收藏</div>
    </div>
    <ul class="news_comments comments_bottom" v-if="news_detail.comments !== undefined">
      <li v-for="item in news_detail.comments" :key="item.comment_name">
        <img class="news_comment_img" :src="item.comment_userImg" alt="">
        <div class="news_comment">
          <p style="color:gray">{{item.comment_name}}</p>
          <p>{{item.comment_content}}</p>
          <ul>
            <li class="news_reply" v-for="items in item.new_replys" @click="isShowComment(item.comment_id,items.reply_user_id,1)"><!--reply_user_id是第一个人的id-->
              <span style="color:gray">{{items.re_name}}</span>评论<span style="color:gray">{{items.re_to_name}}</span>:<span>{{items.re_content}}</span>
            </li>
          </ul>
          <div class="news_bottom">
            <span>{{item.time}}</span>
            <img src="./../../assets/commentList.png" @click="isShowComment(item.comment_id,item.comment_id,2)" /><!--comment_user_id是最外层评论人的id-->
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="noComment">暂时没有评论</div>
    <div @click="isShowComment(null,this.$store.state.user_id,3)" class="news_comment_bottom">
      <img src="./../../assets/comment.png" />
      <span>评论</span>
    </div>
    <transition  name="sideUp">
      <comment v-if="showComment"></comment>
    </transition>
  </div>
</template>
<script>
import comment from './../../components/commentNews/comment'

export default {
    data () {
        return {
          
        }
    },
    methods:{
      //   获取新闻详情页信息
      getNews_detail(news_id){
        const data = {
          user_id:this.$store.state.user_id,
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
      },
      //弹出评论弹框
      isShowComment(id,val,bool){
        this.$stamp(null,id)
        this.$stamp(null,val)
        this.$stamp(null,bool)
        this.$store.state.news.comment_id = id
        this.$store.state.news.commentType = bool
        if(bool == 3){
          this.$store.state.news.comment_user_id = val
        }else{
          this.$store.state.news.reply_user_id = val
        }
        this.$store.state.news.showComment = true
      },
      // 关注新闻
      attention(news_id,topic_type){
        const data = {
          user_id:this.$store.state.user_id,
          to_id:news_id,
          topic_type
        }
        this.$post('/vedioesAttention',data)
            .then((res)=>{ 
                this.$stamp(null,res)
                if(res.code == 200){
                  this.getNews_detail(this.$store.state.news.news_id)
                }else{
                  this.$Toast('网络错误!')
                } 
            })
            .catch((res) =>{
                console.log(res)
        })
      },
      //取消关注新闻
      cancelAttention(news_id,topic_type){
        const data = {
          user_id:this.$store.state.user_id,
          to_id:news_id,
          topic_type
        }
        this.$post('/cancelVedioesAttention',data)
            .then((res)=>{ 
                this.$stamp(null,res)
                if(res.code == 200){
                  this.getNews_detail(this.$store.state.news.news_id)
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
      },
      showComment(){
        return this.$store.state.news.showComment
      }
    },
    components: {
      comment
    },
    created(){
      this.$store.state.isBottom = 0
      this.$stamp(null,this.$route.params.id)
      this.$store.state.news.news_id = this.$route.params.id
      this.getNews_detail(this.$route.params.id)
    }
}
</script>
<style lang="">
  .news_detail{
    box-sizing:border-box;
    padding:10px 15px;
    background-color:#fff;
    margin-bottom:60px;
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
  .news_bottom{
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .news_bottom img{
    width:20px;
    height:20px;
  }
  .news_comment_bottom{
    width:100%;
    padding:10px 0;
    text-align:center;
    background-color:#eee;
    color:gray;
    box-shadow: 0px -2px 3px #ccc;
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    bottom:0;
    left: 0;
    z-index:2;
  }
  .news_comment_bottom:active{
    background-color:#ddd;
  }
  .news_comment_bottom img{
    width:20px;
    height:20px;
    margin-right:3px;
  }
  .news_detail_attention{
    display:flex;
    justify-content:center;
    align-items:center;
    padding:10px;
  }
  .news_detail_attention_add{
    box-sizing:border-box;
    padding:3px 10px;
    background-color:#f44;
    border-radius:3px;
    color:#fff;
  }
  .news_detail_attention_cancel{
    box-sizing:border-box;
    padding:3px 10px;
    background-color:#ccc;
    border-radius:3px;
    color:#fff;
  }
</style>
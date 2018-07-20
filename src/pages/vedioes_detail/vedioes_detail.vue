<template>  
  <div class="container">
    <div class="player">
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
      >
      </video-player>
    </div>
    <div class="vedioes_detail_title">
      <p class="vedioes_detail_title_left">{{vedioes_detail.title}}</p>
      <p class="vedioes_detail_title_right">{{vedioes_detail.time}}</p>
    </div>
    <div class="vedioes_detail_author">
      <div class="vedioes_detail_author_left">
        <img :src="vedioes_detail.image" />
        <span>{{vedioes_detail.author}}</span>
      </div>
      <div class="vedioes_detail_author_right" v-if="vedioes_detail.status == 0" @click="attention(vedioes_detail.id,2)">+ 收藏</div>
      <div class="vedioes_detail_author_right_did" @click="cancelAttention(vedioes_detail.id,2)" v-else>已收藏</div>
    </div>
    <div class="vedioes_head">全部评论</div>
    <ul class="vedioes_comments comments_bottom" v-if="vedioes_detail.comments !== undefined">
      <li v-for="item in vedioes_detail.comments" :key="item.comment_name">
        <img class="vedioes_comment_img" :src="item.comment_userImg" alt="">
        <div class="vedioes_comment">
          <p style="color:gray">{{item.comment_name}}</p>
          <p>{{item.comment_content}}</p>
          <ul>
            <li class="vedioes_reply" v-for="items in item.new_replys" @click="isShowComment(item.comment_id,items.reply_user_id,1)"><!--reply_user_id是第一个人的id-->
              <span style="color:gray">{{items.re_name}}</span>评论<span style="color:gray">{{items.re_to_name}}</span>:<span>{{items.re_content}}</span>
            </li>
          </ul>
          <div class="vedioes_bottom">
            <span>{{item.time}}</span>
            <img src="./../../assets/commentList.png" @click="isShowComment(item.comment_id,item.comment_user_id,2)" /><!--comment_user_id是最外层评论人的id-->
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="noComment">暂时没有评论</div>
    <div @click="isShowComment(null,this.$store.state.user_id,3)" class="vedioes_comment_bottom">
      <img src="./../../assets/comment.png" />
      <span>评论</span>
    </div>
    <transition  name="sideUp">
      <comment v-if="showComment"></comment>
    </transition>
  </div>
</template>
<script>
import {formateTime} from './../../utils/utils'
import comment from './../../components/commentVedioes/comment'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import './vedioes.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
import videojs from 'video.js'
window.videojs = videojs
// hls plugin for videojs6
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

  export default {
    data () {
        return {
          playerOptions: {
            autoplay: false,
            controls: true,
            techOrder: ['flash', 'html5'],
            sourceOrder: true,
            width:'100%',
            height:200,
            flash: { hls: { withCredentials: false } },
            html5: { hls: { withCredentials: false } },
            sources: [{
              type: 'rtmp/mp4',
              src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
            },{
              type: "video/mp4",
              src: this.$store.state.vedioes.vedioesAddress
              // https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm
            }
            // ,{
            //   withCredentials: false,
            //   type: 'application/x-mpegURL',
            //   src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
            // },{
            //   // mp4
            //   // type: 'video/mp4',
            //   // src: 'http://vjs.zencdn.net/v/oceans.mp4',
            //   // flv
            //   type: 'video/x-flv',
            //   src: 'http://fms.cntv.lxdns.com/live/flv/channel96.flv'
            // }
            ], //sources会根据视频源格式先后播放 谁能播放谁放在最前面就播放当前视频源
            poster: this.$store.state.vedioes.vedioesPoster
            // 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg'
          }
        }
    },
    methods:{
      // 开始播放
      onPlayerPlay(player) {
        console.log(player.paused())
        if(this.$store.state.status == 0){
          this.$store.dispatch('showLogin')
        }
      },
      // 停止播放
      onPlayerPause(player){
        console.log(player)
      },
      // 获取详情页信息
      getVedioes_detail(vedioes_id){
        const data = {
          user_id:this.$store.state.user_id,
          vedioes_id:vedioes_id,
          topic_type:2
        }
        this.$post('/vedioesList_detail',data)
            .then((res)=>{ 
                this.$stamp(null,res)
                if(res.code == 200){
                    this.$store.dispatch('getVedioes_detail',res.data)
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
        this.$store.state.vedioes.comment_id = id
        this.$store.state.vedioes.commentType = bool
        if(bool == 3){
          this.$store.state.vedioes.comment_user_id = val
        }else{
          this.$store.state.vedioes.reply_user_id = val
        }
        this.$store.state.vedioes.showComment = true
      },
      // 关注视频
      attention(vedioes_id,topic_type){
        const data = {
          user_id:this.$store.state.user_id,
          to_id:vedioes_id,
          topic_type:2
        }
        this.$post('/vedioesAttention',data)
            .then((res)=>{ 
                this.$stamp(null,res)
                if(res.code == 200){
                  this.getVedioes_detail(this.$store.state.vedioes.vedioes_id)
                }else{
                  this.$Toast('网络错误!')
                } 
            })
            .catch((res) =>{
                console.log(res)
        })
      },
      //取消关注视频
      cancelAttention(vedioes_id,topic_type){
        const data = {
          user_id:this.$store.state.user_id,
          to_id:vedioes_id,
          topic_type:2
        }
        this.$post('/cancelVedioesAttention',data)
            .then((res)=>{ 
                this.$stamp(null,res)
                if(res.code == 200){
                  this.getVedioes_detail(this.$store.state.vedioes.vedioes_id)
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
      player() {
        return this.$refs.videoPlayer.player
      },
      vedioes_detail:{
        get:function(){
          return this.$store.state.vedioes.vedioes_detail
        },
        set:function(){

        }
      },
      showComment(){
        return this.$store.state.vedioes.showComment
      }
    },
    components: {
      videoPlayer,
      comment
    },
    created(){
      this.$store.state.isBottom = 0
      this.$stamp(null,this.$route.params.id)
      this.$store.state.vedioes.vedioes_id = this.$route.params.id
      this.getVedioes_detail(this.$route.params.id)
    }
    // ,
    // beforeDestroy: () => {
    //   this.dispose()
    // }
  }
</script>

<style lang="">
  .vedioes_detail_title{
    width:100%;
    box-sizing:border-box;
    padding:10px;
    border-bottom:1px solid #ddd;
  }
  .vedioes_detail_title_left{
    font-size:0.26rem;
    font-weight:bold;
  }
  .vedioes_detail_title_right{
    text-align:right;
    color:#ccc;
  }
  .vedioes_detail_author{
    width:100%;
    box-sizing:border-box;
    padding:10px;
    border-bottom:1px solid #ddd;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .vedioes_detail_author_left{
    flex:1;
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .vedioes_detail_author_left img{
    width:0.6rem;
    height:0.6rem;
    border-radius:50%;
    margin-right:10px;
  }
  .vedioes_detail_author_left span{
    font-size:0.26rem;
    color:#010101;
  }
  .vedioes_detail_author_right{
    box-sizing:border-box;
    padding:3px 10px;
    background-color:#f44;
    border-radius:3px;
    color:#fff;
  }
  .vedioes_detail_author_right_did{
    box-sizing:border-box;
    padding:3px 10px;
    background-color:#ccc;
    border-radius:3px;
    color:#fff;
  }
  .vedioes_head{
    box-sizing:border-box;
    margin:0 10px;
    padding:10px 0;
    font-size:0.28rem;
    font-weight:bold;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    /*border-top:1px solid #ddd;*/
  }
  .vedioes_comments{
    width:100%;
    box-sizing:border-box;
    padding:0 10px;
  }
  .vedioes_comments li{
    width:100%;
    display:flex;
  }
  .comments_bottom{
    margin-bottom:0.8rem;
  }
  .vedioes_comment_img{
    width:0.5rem;
    height:0.5rem;
    margin-top:0.3rem;
    margin-right:0.15rem;
    border-radius:50%;
  }
  .vedioes_comment{
    box-sizing:border-box;
    padding:0.15rem 0;
    flex:1;
    border-top:1px solid #ccc;
  }
  .vedioes_reply{
    background-color:#eee;
    box-sizing: border-box;
    padding: 4px;
  }
  .vedioes_reply:active{
    background-color:#e1e1e1;
  }
  .vedioes_comment_bottom{
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
    z-index:2;
  }
  .vedioes_comment_bottom:active{
    background-color:#ddd;
  }
  .vedioes_comment_bottom img{
    width:20px;
    height:20px;
    margin-right:3px;
  }
  .vedioes_bottom{
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .vedioes_bottom img{
    width:20px;
    height:20px;
  }
  :global(.vjs-custom-skin > .video-js .vjs-play-progress){
    background-color:#fff;
  }
</style>
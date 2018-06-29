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
      <p>也催姐妹的日常那种撒旦阿德啊沙发沙发士大夫阿瑟东</p>
      <p>2017-02-03</p>
    </div>
    <div class="vedioes_detail_author">
      <div class="vedioes_detail_author_left">
        <img src="https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg" />
        <span>老邓</span>
      </div>
      <div>关注</div>
    </div>
  </div>
</template>
<script>
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
              src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
            },{
              withCredentials: false,
              type: 'application/x-mpegURL',
              src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
            },{
              // mp4
              // type: 'video/mp4',
              // src: 'http://vjs.zencdn.net/v/oceans.mp4',
              // flv
              type: 'video/x-flv',
              src: 'http://fms.cntv.lxdns.com/live/flv/channel96.flv'
            }], //sources会根据视频源格式先后播放 谁能播放谁放在最前面就播放当前视频源
            poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg'
          }
        }
    },
    methods:{
      onPlayerPlay(player) {
        console.log(player.paused())
        this.onPlayerPause()
        console.log(this)
      },
      onPlayerPause(player){
        console.log(player)
      },
      getVedioes_detail(vedioes_id){
        const data = {
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
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    components: {
      videoPlayer
    },
    created(){
      this.$stamp(null,this.$route.params.id)
      this.getVedioes_detail(this.$route.params.id)
    }
    // ,
    // beforeDestroy: () => {
    //   this.dispose()
    // }
  }
</script>

<style lang="">
  
</style>
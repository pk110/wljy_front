<template>
    <div class="commentVedioes">
        <div class="commentVedioes_top">
            <span @click="cancelComment">取消</span>
            <div class="commentVedioes_top_center">
                <span>发评论</span>
                <span class="commentVedioes_name">杠南</span>
            </div>
            <span class="commentVedioes_top_end" @click="sendContent">发送</span>
        </div>
        <div class="commentVedioes_content">
          <van-cell-group>
            <van-field
              v-model="message"
              type="textarea"
              placeholder="请输入评论内容"
              rows="1"
              autosize
            />
          </van-cell-group>
        </div>
    </div>
</template>
<script>
// import {vanCellGroup} from 'vant'
     export default {
        data () {
            return {
              message:''
            }
        },
        methods:{
          //取消评论弹窗
          cancelComment(){
            this.$store.dispatch('cancelCommentVedioes')
          },
          //发表评论
          sendContent(){
            this.$stamp(null,this.message)
            this.$stamp(null,this.$store.state.vedioes.commentType)
            if(this.message == ''){
              this.$Toast('评论内容不能为空')
              return false
            }
            if(this.$store.state.vedioes.commentType == 3){
              // 底部发表评论
              const data = {
                user_id:this.$store.state.vedioes.comment_user_id,
                content:this.message,
                topic_id:this.$store.state.vedioes.vedioes_id   //视频id
              }
              this.$post('/vedioesComment',data)
                  .then((res)=>{ 
                      this.$stamp(null,res)
                      if(res.code == 200){
                        this.$store.dispatch('cancelCommentVedioes')
                        const data = {
                          vedioes_id:this.$store.state.vedioes.vedioes_id,
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
                      }else{
                        this.$Toast(res.message)
                        this.$store.dispatch('cancelCommentVedioes')
                      } 
                  })
                  .catch((res) =>{
                      console.log(res)
              })
            }else if(this.$store.state.vedioes.commentType == 2){
              //回复评论
              const data = {
                comment_id:this.$store.state.vedioes.comment_id,
                user_id:2,
                content:this.message,
                to_id:this.$store.state.vedioes.reply_user_id   //视频id
              }
              this.$post('/vedioesReply',data)
                  .then((res)=>{ 
                      this.$stamp(null,res)
                      if(res.code == 200){
                        this.$store.dispatch('cancelCommentVedioes')
                        const data = {
                          vedioes_id:this.$store.state.vedioes.vedioes_id,
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
                      }else{
                        this.$Toast(res.message)
                        this.$store.dispatch('cancelCommentVedioes')
                      } 
                  })
                  .catch((res) =>{
                      console.log(res)
              })
            }else if(this.$store.state.vedioes.commentType == 1){
              //回复评论
              const data = {
                comment_id:this.$store.state.vedioes.comment_id,
                user_id:2,
                content:this.message,
                to_id:this.$store.state.vedioes.reply_user_id   //视频id
              }
              this.$post('/vedioesReply',data)
                  .then((res)=>{ 
                      this.$stamp(null,res)
                      if(res.code == 200){
                        this.$store.dispatch('cancelCommentVedioes')
                        const data = {
                          vedioes_id:this.$store.state.vedioes.vedioes_id,
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
                      }else{
                        this.$Toast(res.message)
                        this.$store.dispatch('cancelCommentVedioes')
                      } 
                  })
                  .catch((res) =>{
                      console.log(res)
              })
            }
          }
        },
        computed: {
          
        },
        components: {
          // "van-cell-group":vanCellGroup
        },
        created(){
          
        }
    }  
</script>
<style lang="">
    .commentVedioes{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        width:100%;
        overflow:auto;
        background:#fff;    
        z-index: 200;
    } 
    .commentVedioes_top{
        width:100%;
        box-sizing:border-box;
        padding:3px 10px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        background-color:#eee;
        box-shadow: 0px 2px 3px #ccc;
    }
    .commentVedioes_top_center{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    .commentVedioes_top_end{
        box-sizing:border-box;
        padding:3px 5px;
        border:1px solid #ddd;
        border-radius:2px;
        color:gray;
    }
    .commentVedioes_name{
        color:gray;
    }
</style>
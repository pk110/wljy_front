<template>
  <div class="myCollection">
    <van-nav-bar
        title="我的收藏"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            :offset="offset"
            :immediate-check="check"
        >
            <van-cell v-for="(item,index) in myCollectionList" :key="index"> 
               <template slot="title">
                 <router-link v-if="item.topic_type == 2" :to="{path:'/Future/vedioes/'+item.id,params:{id:item.id}}">
                   <div class="myCollectionList">
                       <div class="myCollectionList_left">
                           <p>{{item.title}}</p>
                           <div class="myCollectionList_left_bottom">
                               <span>{{item.author}}</span>
                               <span style="padding-left:10px;">{{item.time}}</span>
                           </div>
                       </div>
                       <div class="myCollectionList_right">
                           <img :src="item.image" />
                       </div>
                   </div>
                 </router-link> 
                 <router-link v-else-if="item.topic_type == 3" :to="{path:'/Future/news/'+item.news_id,params:{news_id:item.news_id}}">
                   <div class="myCollectionListThree" >
                       <p>{{item.title}}</p>
                       <div class="myCollectionListThreeImg">
                           <img :src="item.image" />
                           <img :src="item.image" />
                           <img :src="item.image" />
                       </div>
                        <div class="myCollectionList_left_bottom">
                            <span>{{item.author}}</span>
                            <span style="padding-left:10px;">{{item.time}}</span>
                        </div>
                   </div>
                 </router-link>
               </template>
            </van-cell>
        </van-list> 
    </van-pull-refresh>
  </div>
</template>
<script>
    let count = 1
    export default {
        data () {
            return {
                offset:10,
                loading: false,
                isLoading: false,
                finished: false,
                check:true
            }
        },
        methods:{
            //返回我的页面
            onClickLeft(){
                this.$router.push({
                    path:'/my'
                })
            },
            // 上拉加载
          onLoad() {  
              const data ={
                  user_id:'1',
                  currentPage:count
              }
            this.$post('/myCollection',data)
                .then((res)=>{ 
                    this.$stamp(null,res)
                    if(res.code == 200){
                        if(res.data.list.length == 0){
                            this.loading = false;
                            this.finished = true
                        }else{
                            this.$store.dispatch('getCollectionList',res.data.list)
                            count++;
                            this.loading = false;
                        }
                        console.log(count)
                    }else{
                        this.$Toast('网络错误!')
                    } 
                })
                .catch((res) =>{
                    console.log(res)
            })
          },
          //下拉刷新
          onRefresh() {
            const data ={
                user_id:'1',
                currentPage:1
            }
            this.$post('/myCollection',data)
                .then((res)=>{ 
                    this.$stamp(null,res)
                    if(res.code == 200){
                        this.$store.state.my.myCollectionList = []
                        this.$store.dispatch('getCollectionList',res.data.list)
                        count = 1
                        this.isLoading = false;
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
           myCollectionList(){
                return this.$store.state.my.myCollectionList
           }
        },
        components: {
            
        },
        created(){
            this.$store.state.isBottom = 0
            // this.onRefresh()
        }
    }
</script>
<style lang="">
    .myCollectionList,.myCollectionList_left_bottom{
        width:100%;
        display:flex;
        align-items:center;
    }
    .myCollectionList_left{
        flex:2;
        height:1.5rem;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
    }
    .myCollectionList_right{
        flex:1;
        height:1.5rem;
    }
    .myCollectionList_right img{
        width:100%;
        height:100%;
    }
    .myCollectionListThree{
        display:flex;
        flex-direction:column;
        justify-content:space-between;
    }
    .myCollectionListThreeImg{
        margin:0.1rem 0;
        width:100%;
        display:flex;
        align-items:center;
    }
    .myCollectionListThreeImg img{
        width:32%;
        height:auto;
    }
    .myCollectionListThreeImg img:nth-child(2n){
        margin:0 2%;
    }
</style>
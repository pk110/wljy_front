<template>
    <div>
        <form action="/" >
            <van-search
                v-model="searchValue"
                placeholder="请输入商品名称"
                :show-action='showActive'
                maxlength='20'
                @search="onSearch"
            />
        </form>
        <van-notice-bar
            :text="noticeBarText"
            :left-icon="horn"
            v-if="noticeShow"
        />
        <div class="index_body">
            <van-swipe :autoplay="3000" style="height:2rem">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" :src="image" style="width:100%;height:100%" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="line"></div>
        <!--直播推荐-->
        <div class="index_content">
            <div class="index_head">
                <img src="./../../assets/hot.png" alt="">
                <span>直播推荐</span>
            </div>
            <ul>
               <li v-for="item in livesListFour">
                 <div class="index_box" v-lazy:background-image="item.image">
                     <div class="index_box_bottom">
                        <span>{{item.author}}</span>
                        <div class="index_box_bottom_right">
                            <img src="./../../assets/hot.png" alt="">
                            <span>{{item.hot}}</span>
                        </div>
                     </div>
                 </div>
                 <p>{{item.title}}</p>
               </li>
            </ul>
            <div class="more_content"><router-link :to="{path:'/Future/lives'}">更多直播</router-link></div>
        </div>
        <!--视频推荐-->
        <div class="index_content">
            <div class="index_head">
                <img src="./../../assets/hot.png" alt="">
                <span>视频推荐</span>
            </div>
            <ul>
               <li v-for="item in vedioesListFour">
                 <div class="index_box" v-lazy:background-image="item.image">
                     <div class="index_box_bottom">
                        <span>{{item.author}}</span>
                        <div class="index_box_bottom_right">
                            <img src="./../../assets/hot.png" alt="">
                            <span>{{item.hot}}</span>
                        </div>
                     </div>
                 </div>
                 <p>{{item.title}}</p>
               </li>
            </ul>
            <div class="more_content"><router-link :to="{path:'/Future/vedioes'}">更多视频</router-link></div>
        </div>
        <!--新闻推荐-->
        <div class="index_content">
            <div class="index_head">
                <img src="./../../assets/hot.png" alt="">
                <span>新闻推荐</span>
            </div>
            <ul>
               <li v-for="item in newsListFour">
                 <div class="index_box" v-lazy:background-image="item.image">
                     <div class="index_box_bottom">
                        <span>{{item.author}}</span>
                        <div class="index_box_bottom_right">
                            <img src="./../../assets/hot.png" alt="">
                            <span>{{item.hot}}</span>
                        </div>
                     </div>
                 </div>
                 <p>{{item.title}}</p>
               </li>
            </ul>
            <div class="more_content"><router-link :to="{path:'/Future/news'}">更多新闻</router-link></div>
        </div>
        <div class="box_bottom">关注未来 是你的未来</div>
    </div>
</template>
<script>
    import { Search,NoticeBar, Swipe, SwipeItem} from 'vant'
    const horn = require('./../../assets/horn.png')

    export default {
        data () {
            return {
                searchValue:'',
                showActive:false,
                horn:horn,
                images: [
                    'http://t1.mmonly.cc/uploads/tu/201806/9999/2e4bc587e5.jpg',
                    'http://t1.mmonly.cc/uploads/tu/201806/9999/9f4c387e70.jpg'
                ]
            }
        },
        methods:{
            onSearch(v){
                this.$stamp(true,v.length)
                this.$Toast.fail('不能超过20字')
            }
        },
        computed: {
            noticeBarText(){
                return this.$store.state.index.noticeBarText
            },
            noticeShow(){
                return this.$store.state.index.noticeShow
            },
            livesListFour(){
                return this.$store.state.index.livesListFour
            },
            newsListFour(){
                return this.$store.state.index.newsListFour
            },
            vedioesListFour(){
                return this.$store.state.index.vedioesListFour
            }
        },
        components: {
            'van-search':Search,
            'van-swipe':Swipe,
            'van-swipe-item':SwipeItem,
            'van-notice-bar':NoticeBar
        },
        created(){
            //获取通告信息
            const data = {
                title:'通告栏'
            }
            this.$post('/notice',data)
                .then((res)=>{ 
                    this.$stamp(null,res)
                    if(res.code == 200){
                        this.$store.dispatch('getNotice',res.data[0].content)
                    }else{
                        this.$Toast('网络错误!')
                    }
                })
                .catch((res) =>{
                    console.log(res)
            })
            //获取直播前四条
            this.$post('/livesListFour',data)
                .then((res)=>{ 
                    this.$stamp(null,res)
                    if(res.code == 200){
                        this.$store.dispatch('getLivesListFour',res.data)
                    }else{
                        this.$Toast('网络错误!')
                    }
                })
                .catch((res) =>{
                    console.log(res)
            })
            //获取新闻前四条
            this.$post('/newsListFour',data)
                .then((res)=>{ 
                    this.$stamp(null,res)
                    if(res.code == 200){
                        this.$store.dispatch('getNewsListFour',res.data)
                    }else{
                        this.$Toast('网络错误!')
                    }
                })
                .catch((res) =>{
                    console.log(res)
            })
            //获取视频前四条
            this.$post('/vedioesListFour',data)
                .then((res)=>{ 
                    this.$stamp(null,res)
                    if(res.code == 200){
                        this.$store.dispatch('getVedioesListFour',res.data)
                    }else{
                        this.$Toast('网络错误!')
                    }
                })
                .catch((res) =>{
                    console.log(res)
            })
        }
    }
</script>
<style lang="">
    .index_body{
        /*position:fixed;
        top:42px;
        bottom:51px;*/
        width:100%;
        overflow-scrolling:touch;
        -webkit-overflow-scrolling: touch;
    }
    .van-swipe__indicator--active{
        background-color:#d8a863;
    }
    .index_content{
        background-color:#fff;
        box-sizing:border-box;
        padding:0.15rem;
    }
    .index_head{
        width:100%;
        display:flex;
        justify-content:flex-start;
        align-items:center;
    }
    .index_head img{
        width:0.3rem;
        height:0.3rem;
        margin-right:0.15rem;
    }
    .index_content ul{
        width:100%;
    }
    .index_content ul li{
        width:49%;
        margin-top:0.15rem;
        float:left;
        display:flex;
        flex-direction:column;
    }
    .index_content ul li p{
        width:100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow:hidden;
    }
    .index_content ul li:nth-child(2n){
        margin-left:2%;
    }
    .index_box{
        position:relative;
        width:100%;
        height:1.8rem;
        background-size:cover;
        border-radius:0.2rem;
    }
    .index_box_bottom{
        position: absolute;
        bottom: 0.15rem;
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.15rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-size: 0.14rem;
    }
    .index_box_bottom_right{
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .index_box_bottom_right img{
        width:0.25rem;
        height:0.25rem;
        margin-right:0.1rem;
    }
    .line{
        width:100%;
        height:0.2rem;
        background-color:#eee;
    }
    .more_content{
        width:100%;
        height:1rem;
        text-align:center;
        line-height:1rem;
        clear:both;
        border-bottom:1px solid #eee;
    }
    .more_content a{
        color:#d8a863;
    }
    .box_bottom{
        width:100%;
        height:2rem;
        text-align:center;
        line-height:1.3rem;
        color:gray;
    }
</style>
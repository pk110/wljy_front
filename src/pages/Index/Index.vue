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
</style>
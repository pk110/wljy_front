<template>
  <div class="news_detail">
      <ul>
        <li v-for="item in news_detail">
            <img v-for="items in item.images" :src="items" />
            <p>{{item.content}}</p>
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
          news_id:news_id
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

</style>
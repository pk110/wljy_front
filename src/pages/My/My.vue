<template>
  <div>
      <div class="My_top">
          <div class="My_top_content">
              <img class="My_top_content_img" src="http://t1.mmonly.cc/uploads/tu/201806/9999/2e4bc587e5.jpg" alt="">
              <div class="My_top_sex">
                <span>背着吉他的蝙蝠侠</span>
                <img src="./../../assets/woman.png" alt="">
              </div>
          </div>
      </div>
      <van-cell-group>
         <van-cell title="订单管理" icon="pending-orders" is-link />
         <van-cell title="我的收藏" :to='myCollection' icon="like-o" is-link />
         <van-cell title="我的课程" icon="records" is-link />
         <van-cell title="学习计划" icon="edit-data" is-link />
      </van-cell-group>
  </div>
</template>
<script>
    import { Cell, CellGroup } from 'vant'

    export default {
        data () {
            return {
                myCollection:'/myCollection'
            }
        },
        methods:{
        
        },
        computed: {
        
        },
        components: {
            'van-cell-group':CellGroup,
            'van-cell':Cell
        },
        created(){
        
        }
    }
</script>
<style lang="">
  .My_top{
      width:100%;
      height:4rem;
      background:url(./../../assets/bcMy.jpg) no-repeat;
      background-size:100;
      background-position:center center;
      animation: animatedBackground 8s linear infinite alternate;
      text-align:center;
  }
  @keyframes animatedBackground{
      from { background-position-y: 45% }
      to { background-position-y:  60% }
  }
  .My_top_content{
      display:flex;
      flex-direction:column;
      align-items:center;
      padding-top:1rem;
  }
  .My_top_content_img{
      display:block;
      padding:5px;
      border:4px solid #fff;
      border-radius:50%;
      width:1rem;
      height:1rem;
      margin-bottom:10px;
  }
  .My_top_content span{
      color:#fff;
  }
  .My_top_sex{
      display:flex;
      align-items:center;
  }
  .My_top_sex img{
      width:0.2rem;
      height:0.2rem;
      margin-left:5px;
  }
</style>
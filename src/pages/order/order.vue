<template>
  <div class="order">
    <van-cell-group>
      <van-cell :title="username" />
      <van-cell :title="status" />
    </van-cell-group>
    <div class="orderLine"></div>
    <div v-for="items in orderList" :key="items.id" class="orderList">
      <div class="orderList_title">{{items.title}}</div>
      <div class="orderList_body">
        <img :src="items.image" :alt="items.title" />
        <div class="orderList_body_right">
            <span v-if="items.specialMoney == 0">￥{{items.money}}</span>
            <span v-else><span style="text-decoration:line-through;color:red">￥{{items.money}}</span> 特价:￥{{items.specialMoney}}</span>
            <span>x1</span>
            <span>{{items.people}}人购买</span>
        </div>
      </div>
    </div>
    <div class="orderTotalProducts">共{{orderList.length}}件商品</div>
    <div class="orderLine"></div>
    <van-submit-bar
      :loading="submitLoading"
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <span slot="tip">
        购买后不支持退款、转让,请确认开课时间或有效期后再提交订单。
      </span>
    </van-submit-bar>
  </div>
</template>
<script>

    export default {
        data () {
            return {
              totalPrice:0,
              orderList:this.$route.params.orderDetail,
              submitLoading:false,
              statusPhone:this.$store.state.status, //初次给用户去绑定 第二次可以直接支付
              username:'购买账号:'+this.$store.state.username,
              status:this.$store.state.status == 0?'手机号:未绑定':'手机号:'+this.$store.state.myPhone
            }
        },
        methods:{
          //提交订单
          onSubmit(){
            if(this.statusPhone == 0){
              this.$store.dispatch('showLogin')
              this.statusPhone = 1
              return false
            }else{
              this.submitLoading = true
              if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', (data) =>{console.log(data)}, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', (data) =>{console.log(data)}); 
                    document.attachEvent('onWeixinJSBridgeReady', (data) =>{console.log(data)});
                }
              }else{
                this.onBridgeReady();
              }
            }
          },
          // 支付函数
          onBridgeReady(){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
                  "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
                  "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
                  "package":"prepay_id=u802345jgfjsdfgsdg888",     
                  "signType":"MD5",         //微信签名方式：     
                  "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
                },
                function(res){
                  if(res.err_msg == "get_brand_wcpay_request:ok" ){
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  } 
            })
          }
        },
        computed: {

        },
        components: {
          
        },
        created(){
          this.$stamp(null,this.$route.params.orderDetail)
          for(let i = 0;i<this.$route.params.orderDetail.length;i++){
            if(this.$route.params.orderDetail[i].specialMoney == 0){
              this.totalPrice += this.$route.params.orderDetail[i].money*100
            }else{
              this.totalPrice += this.$route.params.orderDetail[i].specialMoney*100
            }
          }
        }
    }
</script>
<style lang="">
    .order .van-hairline--top-bottom::after{
      border-width:1px 0;
    }
    .orderLine{
      width:100%;
      height:0.15rem;
      background-color:#eee;
    }
    .orderList{
      display:flex;
      flex-direction:column;
      border-bottom:1px solid #eee;
      box-sizing:border-box;
      padding:0.05rem 0.3rem;
    }
    .orderList_body{
      display:flex;
      align-items:center;
      justify-content:space-between;
    }
    .orderList_body img{
      width:2rem;
      height:1.5rem;
      margin:0.15rem 0;
    }
    .orderList_body_right{
      display:flex;
      flex-direction:column;
      height:1.5rem;
      align-items:flex-end;;
      justify-content:space-between;
    }
    .orderTotalProducts{
      width:100%;
      height:0.8rem;
      line-height:0.8rem;
      box-sizing:border-box;
      padding:0 0.3rem;
      text-align:right;
    }
</style>
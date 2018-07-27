<template>
  <div class="myCarts_container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if="myCartsList.length !== 0">
        <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            :offset="offset"
            :immediate-check="check"
        >
          <van-checkbox-group v-model="result">
            <van-cell-group>  
              <van-cell v-for="(item,index) in myCartsList" :key="index"> 
                <template slot="title">
                  <div class="myCarts">
                      <van-checkbox 
                      :name="item.vedioes_id" 
                      ref="checkboxes"/>
                      </van-checkbox>
                      <span>{{item.title}}</span>
                  </div>
                  <router-link :to="{path:'/Future/vedioes/'+item.vedioes_id,params:{id:item.vedioes_id}}">
                      <van-card
                        :title="item.title"
                        :desc="item.title"  
                        num="2"
                        price="2.00"
                        :thumb="item.image"
                      >
                      </van-card>
                  </router-link>
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-list> 
    </van-pull-refresh>
    <div v-else class="noCarts">
      您没有商品哦!
    </div>
    <van-submit-bar
      :loading="submitLoading"
      :disabled="myCartsList.length !== 0?false:true"
      :price="3050"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" :disabled="myCartsList.length !== 0?false:true" style="padding-left:10px;">全选</van-checkbox>
      <span slot="tip">
        记得下订单时 请勾选优惠券哦!
      </span>
    </van-submit-bar>
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
                check:false,
                checked:false,
                submitLoading:false,
                result:[],
                initResult:this.$store.state.my.initResult
            }
        },
        methods:{
          //提交订单
          onSubmit(){
            this.$stamp(null,this.result)
            this.submitLoading = true
            // 这里请求到所有订单信息后通过路由将订单信息带过去
              const data ={
                  orderIds:this.result
              }
            this.$post('/getOrderDetail',data)
                .then((res)=>{ 
                    this.$stamp(null,res)
                    if(res.code == 200){
                      this.$router.push({
                        name:'订单',
                        params:{
                          orderDetail:res.data
                        }
                      })
                      this.submitLoading = false
                    }else{
                        this.$Toast('网络错误!')
                    } 
                })
                .catch((res) =>{
                    console.log(res)
            })
          },
            // 上拉加载
          onLoad() {  
              const data ={
                  user_id:this.$store.state.user_id,
                  currentPage:count
              }
            this.$post('/myCarts',data)
                .then((res)=>{ 
                    this.$stamp(null,res)
                    if(res.code == 200){
                        if(res.data.length == 0){
                            this.loading = false;
                        }else{
                            this.$store.dispatch('getCartsList',res.data)
                            count++;
                            this.loading = false;
                        }
                          this.finished = true
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
                user_id:this.$store.state.user_id,
                currentPage:1
            }
            this.$post('/myCarts',data)
                .then((res)=>{ 
                    this.$stamp(null,res)
                    if(res.code == 200){
                        this.$store.state.my.myCartsList = []
                        this.$store.dispatch('getCartsList',res.data)
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
          myCartsList(){
            return this.$store.state.my.myCartsList
          }
        },
        components: {
            
        },
        created(){
          this.onRefresh()
          this.$store.state.isBottom = 0
        },
        watch:{
          checked(newValue, oldValue){
            if(newValue == true){
              this.result = this.$store.state.my.initResult
            }else{
              this.result = []
            }
          }
        }
    }
</script>
<style lang="">
    .myCarts_container{
      width:100%;
      height:10rem;
    }
    .noCarts{
      width:100%;
      display:flex;
      justify-content:center;
      margin-top:3rem;
      font-size:0.17rem;
    }
    .myCarts{
      display:flex;
      justify-content:flex-start;
      align-items:center;
    }
    .myCarts span{
      padding-left:0.1rem;
    }
    .myCarts .van-checkbox{
      display:inline-block;
    }
    .van-cell:not(:last-child)::after{
      left:0;
    }
</style>
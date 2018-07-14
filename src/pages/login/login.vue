<template>
  <div class="login">
      <div class="login_top">
          <img @click="choseLogin" src="./../../assets/close.png" />
      </div>
      <div class="login_body">
          <img src="./../../assets/education.png" class="login_body_logo" />
          <div class="login_body_phone">
              <label>手机号</label>
              <!--<input type="text" ref="phone" v-model="phone" @focus="focusPhone" @blur="blurPhone">-->
              <input class="login_body_phone_input" type="text" ref="phone" v-model="phone">
          </div>
      </div>
      <van-number-keyboard
        :show="showKeyboard"
        extra-key="."
        close-button-text="完成"
        @blur="showKeyboard = false"
        @input="onInput"
        @delete="onDelete"
      />
  </div>
</template>
<script>

export default {
    data () {
        return {
           phone:'',
           showKeyboard:true
        }
    },
    methods:{
        onInput(value) {
            this.phone += value
            this.$refs.phone.focus()
        },
        onDelete() {
            this.phone = this.phone.substring(0,this.phone.length-1)
            console.log(this.phone)
        },
        //关闭登陆界面
        choseLogin(){
            this.$store.state.showLogin = false
        },
        // 弹出数字弹框
        focusPhone(){
            console.log(this.phone)
        },
        //隐藏数字弹框
        blurPhone(){
            console.log('隐藏')
        }
    },
    computed: {
    
    },
    components: {
        
    },  
    mounted() {
        this.$nextTick(() => {this.$refs.phone.focus()})
        this.phone = ''
    },
    created(){
        
    }
}
</script>
<style lang="">
    .login{
        position:fixed;
        top:0;
        bottom:0;
        width:100%;
        box-sizing:border-box;
        padding:10px;
        z-index:99999;
        background-color:#fff;
    }
    .login_top{
        width:100%;
        height:1rem;
        display:flex;
        justify-content:flex-start;
    }
    .login_top img{
        width:0.4rem;
        height:0.4rem;
    }
    .login_body{
        width:100%;
        margin-top:1rem;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:flex-start;
    }
    .login_body_logo{
        display:inline-block;
        margin:0 auto;
        width:2rem;
        height:auto;
    }
    .login_body_phone input{
        border-width:0;
        border-bottom:1px solid #ccc;
        margin-left:10px;
    }
    .login_body_phone_input::before{
        content:'|';
        color:red;
    }
</style>
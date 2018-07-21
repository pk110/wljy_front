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
              <div class="login_body_phone_input">
                <span></span>
                <input type="text" ref="phone" @focus="phoneFocus" v-model="phone" placeholder="请输入手机号">
                <span></span>
              </div>
          </div>
          <div class="login_body_code">
              <label>验证码</label>
              <div class="login_body_code_input">
                <input type="text" ref='code' v-model="code" @focus="codeFocus" placeholder="请输入验证码">
                <span @click="getCode" v-if="initCode === '获取验证码'">{{initCode}}</span>
                <span v-else>{{initCode}}秒</span>
              </div>
          </div>
          <div class="loginButton" v-if="status == 0" style="opacity:0.7" >登录</div>
          <div class="loginButton" @click="login" v-else>登录</div>
          <div class="checked">
            <van-checkbox v-model="checked">登录即表示同意 服务条款</van-checkbox>
          </div>
      </div>
      <van-number-keyboard
        :show="showPhoneKeyboard"
        extra-key="."
        close-button-text="完成"
        @blur="showPhoneKeyboard = false"
        @input="onPhoneInput"
        @delete="onPhoneDelete"
      />
      <van-number-keyboard
        :show="showCodeKeyboard"
        extra-key="."
        close-button-text="完成"
        @blur="showCodeKeyboard = false"
        @input="onCodeInput"
        @delete="onCodeDelete"
      />
  </div>
</template>
<script>
let timeCode;
export default {
    data () {
        return {
           phone:'',
           showPhoneKeyboard:true,
           showCodeKeyboard:false,
           code:'',
           initCode:'获取验证码',
           checked:true,
           status:0
        }
    },
    methods:{
        onPhoneInput(value) {
          this.phone += value
          this.$refs.phone.focus()
        },
        onPhoneDelete() {
            this.phone = this.phone.substring(0,this.phone.length-1)
        },
        onCodeInput(value) {
          this.code += value
          this.$refs.code.focus()
        },
        onCodeDelete() {
            this.code = this.code.substring(0,this.code.length-1)
        },
        //登录按钮
        login(){
          if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))){
            this.$Toast('请输入正确的手机号');
            return false
          }
          const data = {
            user_id:this.$store.state.user_id,
            code:this.code,
            phone:this.phone
          }
          this.$post('/bindphone',data)
              .then((res)=>{ 
                  this.$stamp(null,res)
                  if(res.code == 200){
                    this.$store.state.showLogin = false 
                    this.$store.state.status = 1  
                    this.$Toast('绑定成功!')
                  }else{
                    this.$Toast(res.message)
                  } 
              })
              .catch((res) =>{
                  console.log(res)
          })
        },
        //关闭登陆界面
        choseLogin(){
            this.$store.state.showLogin = false
        },
        // 获取到验证码焦点，打开数字键盘
        codeFocus(){
          this.showCodeKeyboard = true
          this.showPhoneKeyboard = false
        },
        // 获取到手机号焦点，打开数字键盘
        phoneFocus(){
          this.showPhoneKeyboard = true
          this.showCodeKeyboard = false
        },
        // 获取验证码
        getCode(){
          if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))){
            this.$Toast('请输入正确的手机号');
            return false
          }
          this.initCode = 60
          timeCode = setInterval(()=>{
            this.initCode--;
          },1000)
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

    },
    watch:{
      initCode(newValue, oldValue) {
        if(newValue == 0){
          clearTimeout(timeCode)
          this.initCode = '获取验证码'
        }
      },
      code(newValue,oldValue){
        if(newValue !== '' && this.phone !== '' && this.checked == true){
          this.status = 1
        }else{
          this.status = 0
        }
      },
      phone(newValue,oldValue){
        if(newValue !== '' && this.code !== '' && this.checked == true){
          this.status = 1
        }else{
          this.status = 0
        }
      },
      checked(newValue,oldValue){
        if(newValue == true && this.phone !== '' && this.code !== ''){
          this.status = 1
        }else{
          this.status = 0
        }
      },
    }
  }
</script>
<style lang="">
.loginButton{
  width:3.5rem;
  color:#fff;
  margin-top:0.3rem;
  line-height:0.4rem;
  text-align:center;
  background-color:#d8ac65;
  border-radius:0.2rem;
}
.checked{
  margin-top:0.4rem;
}
.checked .van-checkbox__icon{
  line-height:13.5px;
}
.checked .van-checkbox__icon .van-icon{
  width:15px;
  height:15px;
}
    .checked span{
      font-size:12px;
    }
    .login{
        position:fixed;
        top:0;
        bottom:0;
        width:100%;
        box-sizing:border-box;
        padding:10px;
        z-index:1000;
        background-color:#fff;
    }
    .login_top{
        width:100%;
        height:1rem;
        display:flex;
        justify-content:flex-start;
    }
    .login_top img{
        width:0.3rem;
        height:0.3rem;
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
    .login_body_phone{
      width: 4rem;
      display:flex;
      align-items:center;
      justify-content:flex-start;
    }
    .login_body_phone_input{
      flex:1;
        margin-left:10px;
        display:flex;
        height:20px;
        justify-content:flex-start;
      border-bottom:1px solid #ccc;
    }
    .login_body_phone_input input{
      padding-left:5px;
      border-width:0;
      width:100%;
    }
    .login_body_phone_input span{
      width:1px;
      display:inline-block;
      height:0.1rem;
      background-color:#ccc;
      margin-top:0.23rem;
    }
    .login_body_code{
      width: 4rem;
      display:flex;
      align-items:center;
      justify-content:flex-start;
      margin-top:0.2rem;
    }
    .login_body_code_input{
      margin-left:10px;
      display:flex;
      height:20px;
      align-items:center;
      justify-content:flex-start;
      border-bottom:1px solid #ccc;
      flex:1;
    }
    .login_body_code_input input{
      padding-left:5px;
      border-width:0;
      width:1.5rem;
    }
    .login_body_code_input span{
      flex:1;
    text-align: right;
      color:#d8ac65;
    }
</style>
<template>
  <div class="Login">
    <!-- 短信登录 -->
    <div class="phoneLoginBox" v-if="phoneLogin">
      <!-- 输入号码 -->
      <div class="account">
        <div class="required">*</div>
        <div class="title">手机号码</div>
        <input class="inputBox" type="text" placeholder="请输入手机号码" v-model="phoneNo" maxlength="11" />
      </div>
      <!-- 号码错误提示 -->
      <div class="wrongNum" v-show="!checkPhone()">你输入的号码格式不正确</div>
      <!-- 输入验证码 -->
      <div class="code">
        <div class="required" style="color: red">*</div>
        <div class="title">短信验证</div>
        <input class="inputBox" type="text" placeholder="请输入短信验证码" v-model="VerifyCo" maxlength="6" />
        <!-- 发送验证码 -->
        <SendSMS class="sendBtn" />
      </div>
    </div>

    <!-- 账号登录 -->
    <div class="accountLoginBox" v-else>
      <!-- 输入号码 -->
      <div class="account">
        <div class="required">*</div>
        <div class="title">账号</div>
        <input class="inputBox" type="text" placeholder="请输入账号" v-model="phoneNo" />
      </div>
      <!-- 输入验证码 -->
      <div class="code">
        <div class="required" style="color: red">*</div>
        <div class="title">密码</div>
        <input class="inputBox" type="text" placeholder="请输入密码" v-model="VerifyCo" />
        <!-- 图片验证码 -->
        <img
          class="captchaImg"
          src="http://demo.itlike.com/web/xlmc/api/captcha"
          ref="imgCaptcha"
          @click="changeCaptcha"
        />
      </div>
    </div>

    <!-- 登录按钮 -->
    <div class="loginBtn">登录</div>

    <!-- 切换登录方式 -->
    <div class="switchLogin" @click="changeLoginType">切换{{loginType}}登录</div>
  </div>
</template>
 
<script>
import SendSMS from "./SendSMS";

export default {
  name: "Login",
  components: {
    SendSMS
  },
  data() {
    return {
      phoneLogin: true, // 控制登录方式
      loginType: "账号密码", // 显示要切换成的登录方式是什么
      phoneNo: "",
      VerifyCo: ""
    };
  },
  methods: {
    // 切换登录方式
    changeLoginType() {
      this.phoneLogin = !this.phoneLogin;
      if (!this.phoneLogin) {
        this.loginType = "短信验证码";
      } else {
        this.loginType = "账号密码";
      }
    },

    // 账号密码登录切换图片验证码
    changeCaptcha() {
      // 更新验证码图片的src，方式是更换时间戳
      let captchaEle = this.$refs.imgCaptcha;
      this.$set(
        captchaEle,
        "src",
        "http://demo.itlike.com/web/xlmc/api/captcha?time=" + new Date()
      );
    },

    // 检查号码是否正确
    checkPhone() {
      // 当输入的手机号大于10位进行验证
      if (this.phoneNo.length > 10) {
        return /[1][3,4,5,6,7,8][0-9]{9}$/.test(this.phoneNo);
      } else {
        return true;
      }
    }
  }
};
</script>
 
<style scoped>
.Login {
  margin-top: 25px;
}

.phoneLoginBox,
.accountLoginBox {
  position: relative;
}

.account,
.code {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  margin: 0 0 20px;
}

.required {
  width: 10px;
  height: 30px;
  line-height: 37px;
  color: red;
}

.title {
  width: 80px;
  height: 30px;
  line-height: 30px;
}

.inputBox {
  flex: 1;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: none;
  outline: none;
}

input::-webkit-input-placeholder {
  font-size: 5px;
}

.wrongNum {
  position: absolute;
  top: 32px;
  right: 0;
  font-size: 5px;
  color: red;
}

.sendBtn {
  width: 60px;
  height: 30px;
  line-height: 30px;
  font-size: 5px;
}

.captchaImg {
  width: 70px;
  height: 30px;
}

.loginBtn {
  margin: 10px auto;
  width: 240px;
  height: 55px;
  line-height: 60px;
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
}

.switchLogin {
  padding-left: 20px;
  color: var(--color-text);
  font-size: 10px;
  text-decoration: underline;
}
</style>
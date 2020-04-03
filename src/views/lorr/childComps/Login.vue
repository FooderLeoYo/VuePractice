<template>
  <div class="Login">
    <!-- 短信登录 -->
    <div class="phoneLoginBox" v-if="phoneLogin">
      <div class="phone">
        <div class="required">*</div>
        <div class="title">手机号码</div>
        <input class="inputBox" type="text" placeholder="请输入手机号码" v-model="phoneNo" />
      </div>

      <div class="code">
        <div class="required" style="color: red">*</div>
        <div class="title">短信验证</div>
        <input class="inputBox" type="text" placeholder="请输入短信验证码" v-model="VerifyCo" />
        <!-- 发送验证码 -->
        <SendSMS class="sendBtn" />
      </div>
    </div>

    <!-- 账号登录 -->
    <div class="accountLoginBox" v-else>
      <div class="phone">
        <div class="required">*</div>
        <div class="title">账号</div>
        <input class="inputBox" type="text" placeholder="请输入账号" v-model="phoneNo" />
      </div>

      <div class="code">
        <div class="required" style="color: red">*</div>
        <div class="title">密码</div>
        <input class="inputBox" type="text" placeholder="请输入密码" v-model="VerifyCo" />
        <!-- 图片验证码 -->
        <img
          src="http://demo.itlike.com/web/xlmc/api/captcha"
          ref="imgCaptcha"
          @click="changeCaptcha"
        />
      </div>
    </div>

    <!-- 登录按钮 -->
    <div class="loginBtn">登录</div>

    <!-- 切换登录方式 -->
    <div class="switchLogin" @click="changeLoginType">{{loginType}}登录</div>
  </div>
</template>
 
<script>
import SendSMS from "components/content/sendSMS/SendSMS";

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
    }
  }
};
</script>
 
<style scoped>
.phone,
.code {
  display: flex;
  margin: 30px 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
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
  height: 30px;
  line-height: 30px;
  border: none;
  outline: none;
}

input::-webkit-input-placeholder {
  font-size: 5px;
}

.loginBtn {
  margin: 10px auto;
  width: 240px;
  height: 55px;
  line-height: 60px;
  text-align: center;
  background-color: var(--color-tint);
  opacity: 1;
}

.switchLogin {
  color: black;
  font-size: 10px;
}
</style>
<template>
  <div class="register">
    <NavBar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt />
        </div>
      </template>
      <template #center>
        <div>新用户注册</div>
      </template>
    </NavBar>

    <div class="main">
      <div class="inBox">
        <input type="text" placeholder="用户名" v-model="name" />
      </div>
      <div class="inBox">
        <input type="text" placeholder="手机号码" v-model="phone" />
      </div>
      <div class="inBox">
        <input type="text" placeholder="短信验证码" v-model="code" />
        <GetVerCode />
      </div>
      <div class="inBox">
        <input type="password" placeholder="登录密码" v-model="loginPW" />
      </div>
      <div class="inBox">
        <input type="password" placeholder="支付密码" v-model="payPW" />
      </div>
      <button class="submit">立即注册</button>
      <router-link to="/login" class="changeBtn">已有账号，去登陆</router-link>
    </div>
  </div>
</template>
 
<script>
import { isDuplicate } from "network/register";

import NavBar from "components/common/navbar/NavBar";

import GetVerCode from "./childComps/GetVerCode";

export default {
  name: "Register",
  components: {
    NavBar,

    GetVerCode
  },
  data() {
    return {
      name: "",
      phone: "",
      code: "",
      loginPW: "",
      payPW: ""
    };
  },
  methods: {
    // 返回上一页
    backClick() {
      this.$router.back();
    }
  }
};
</script>
 
<style scoped>
/* .register {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
} */

.back img {
  margin-top: 11px;
}
</style>
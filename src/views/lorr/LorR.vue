<template>
  <div class="LorR">
    <TopBar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt />
        </div>
      </template>
    </TopBar>

    <div class="main">
      <!-- 切换登录/注册 -->
      <SwitchLR class="switchLorR" @changeType="changeType" />
      <!-- 登录 -->
      <Login v-if="LoinOrRegi === 'login'" />
      <!-- 注册 -->
      <Register v-else />
      <!-- 三方登录 -->
      <ThirdPartyLogin class="thirdPartyLogin" />
      <!-- 用户协议 -->
      <Agreement class="agreement" />
    </div>
  </div>
</template>
 
<script>
import TopBar from "components/common/topbar/TopBar";

import SwitchLR from "./childComps/SwitchLR";
import Login from "./childComps/Login";
import Register from "./childComps/Register";
import ThirdPartyLogin from "./childComps/ThirdPartyLogin";
import Agreement from "./childComps/Agreement";

export default {
  name: "LorR",
  components: {
    TopBar,

    SwitchLR,
    Login,
    Register,
    ThirdPartyLogin,
    Agreement
  },
  data() {
    return {
      LoinOrRegi: "login",
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
    },

    // 切换登录/注册
    changeType(LoinOrRegi) {
      this.LoinOrRegi = LoinOrRegi;
    }
  }
};
</script>
 
<style scoped>
.LorR {
  position: relative;
  z-index: 9;
  height: 100vh;
  background: url(~assets/img/rorl/login.jpg) no-repeat;
  background-size: 375px 667px;
  color: var(--color-text);
}

.back img {
  padding-top: 11px;
}

.main {
  position: absolute;
  top: 50px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  height: 560px;
  padding: 25px;
  border-radius: 15px;
  color: black;
  background-color: #fff;
}
</style>
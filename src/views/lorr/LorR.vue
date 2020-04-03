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
      <SwitchLR @changeType="changeType" />
      <!-- 登录 -->
      <Login v-if="LoinOrRegi === 'login'" />
      <!-- 注册 -->
      <Register v-else />
      <!-- 其他登录方式分割线 -->
      <div class="thirdpartydivide">其他登录方式</div>
      <!-- 三方登录 -->
      <div class="thirdpartylogin">
        <div class="thirdpartyitem wechat">
          <div class="iconfont">&#xe655;</div>
          <div>微信登录</div>
        </div>
        <div class="thirdpartyitem qq">
          <div class="iconfont">&#xe775;</div>
          <div>QQ登录</div>
        </div>
        <div class="thirdpartyitem weibo">
          <div class="iconfont">&#xe604;</div>
          <div>微博登录</div>
        </div>
      </div>
      <!-- 用户协议 -->
      <div class="agreement">
        <p>
          温馨提示：
          <br />未注册的手机号，登录时将自动注册，且代表同意
          <a href>用户协议</a>
          、
          <a href>隐私策略</a>
        </p>
      </div>
    </div>
  </div>
</template>
 
<script>
import TopBar from "components/common/topbar/TopBar";

import SwitchLR from "./childComps/SwitchLR";
import Login from "./childComps/Login";
import Register from "./childComps/Register";

export default {
  name: "LorR",
  components: {
    TopBar,

    SwitchLR,
    Login,
    Register
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
  /* z-index: 9; */
  height: 100vh;
  background: url(~assets/img/register/login.jpg) no-repeat;
  background-size: 375px 667px;
  color: var(--color-text);
}

.back img {
  margin-top: 11px;
}

.main {
  position: absolute;
  top: 70px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  height: 500px;
  border-radius: 20px;
  color: black;
  background-color: #fff;
  opacity: 0.75;
}

.thirdpartydivide {
  font-size: 10px;
  color: rgb(36, 142, 250);
  margin: 10px 0;
}

.thirdpartydivide::before,
.thirdpartydivide::after {
  content: "";
  display: inline-block;
  width: 100px;
  margin: 0 5px 5px 20px;
  border-top: 1px solid rgb(36, 142, 250);
}

.thirdpartylogin {
  display: flex;
  margin: 0 20px;
}

.thirdpartyitem {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.agreement {
  margin: 20px;
}
</style>
<template>
  <div class="profile">
    <NavBar class="profile-nav">
      <template #center>
        <div>我的档案</div>
      </template>
    </NavBar>

    <div class="login">
      <!-- 头像，可点击 -->
      <a href="#" class="iconfont portrait">&#xe674;</a>
      <!-- 登录信息 -->
      <div class="loginBtn">
        <span class="loginText">登录/注册</span>
        <div class="phone">
          <i class="iconfont phoneIcon">&#xe60e;</i>
          <span class="phoneText">暂无绑定手机号</span>
        </div>
      </div>
      <!-- 登录按钮 -->
      <a href="#" class="iconfont vector">&#xe656;</a>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Profile",
  components: {
    NavBar
  }
};
</script>

<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: #eee;
}

.login {
  display: flex;
  height: 80px;
  background-color: rgb(255, 142, 151);
}

.portrait {
  width: 100px;
  line-height: 80px;
  padding: 0 10px 0 30px;
  font-size: 60px;
  color: #eee;
}

.loginBtn {
  flex: 1;
  position: relative;
  height: 80px;
  color: #eee;
}

.loginText {
  position: absolute;
  top: 17px;
  left: 5px;
  font-size: 20px;
}

.phone {
  position: absolute;
  bottom: 17px;
}

.phoneIcon {
  font-size: 20px;
}

.phoneText {
  font-size: 8px;
}

.vector {
  width: 60px;
  line-height: 80px;
  font-size: 30px;
  color: #eee;
}
</style>

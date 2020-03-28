<template>
  <!-- 登录 -->
  <div class="login">
    <!-- 头像，可点击 -->
    <i class="iconfont portrait">&#xe674;</i>
    <!-- 登录信息 -->
    <div class="loginBtn">
      <span class="loginText">登录/注册</span>
      <div class="phone">
        <i class="iconfont phoneIcon">&#xe60e;</i>
        <span class="phoneText">暂无绑定手机号</span>
      </div>
    </div>
    <!-- 登录按钮 -->
    <i class="iconfont vector">&#xe656;</i>
  </div>
</template>
 
<script>
export default {
  name: "Login"
};
</script>
 
<style scoped>
.login {
  display: flex;
  height: 80px;
  background-color: rgb(255, 142, 151);
}

.portrait {
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
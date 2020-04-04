<template>
  <div class="ThirdPartyLogin">
    <!-- 其他登录方式分割线 -->
    <div class="divide">其他登录方式</div>
    <!-- 登录区域 -->
    <div class="loginArea">
      <div class="thirdpartyitem wechat">
        <img class="thirdPartyLogo" src="~assets/img/rorl/wechat.png" alt />
        <div>微信登录</div>
      </div>
      <div class="thirdpartyitem qq">
        <img class="thirdPartyLogo" src="~assets/img/rorl/qq.png" alt />
        <div>QQ登录</div>
      </div>
      <div class="thirdpartyitem weibo">
        <img class="thirdPartyLogo" src="~assets/img/rorl/weibo.png" alt />
        <div>微博登录</div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "ThirdPartyLogin"
};
</script>
 
<style scoped>
.ThirdPartyLogin {
  margin-top: 40px;
}

.divide {
  width: 300px;
  font-size: 10px;
  color: rgb(36, 142, 250);
}

.divide::before,
.divide::after {
  content: "";
  display: inline-block;
  width: 95px;
  border-top: 1px solid rgb(36, 142, 250);
}

.divide::before {
  margin-right: 10px;
}

.divide::after {
  margin-left: 10px;
}

.loginArea {
  display: flex;
  margin-top: 30px;
}

.thirdpartyitem {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.thirdPartyLogo {
  width: 40px;
  height: 40px;
}
</style>
<template>
  <div class="profile">
    <!-- 顶部导航 -->
    <NavBar class="profile-nav">
      <template #center>
        <div>我的档案</div>
      </template>
    </NavBar>
    <Login @click.native="loginClick" />
    <Data />
    <div class="threeOpts">
      <optBtn>
        <template #icon>
          <i class="iconfont">&#xe60a;</i>
        </template>
        <template #text>
          <div>我的信息</div>
        </template>
      </optBtn>
      <optBtn>
        <template #icon>
          <i class="iconfont">&#xe68f;</i>
        </template>
        <template #text>
          <div>积分商城</div>
        </template>
      </optBtn>
      <optBtn :isUnderline="false">
        <template #icon>
          <i class="iconfont">&#xe61a;</i>
        </template>
        <template #text>
          <div>会员卡</div>
        </template>
      </optBtn>
    </div>
    <div class="twoOpts">
      <optBtn>
        <template #icon>
          <i class="iconfont">&#xe600;</i>
        </template>
        <template #text>
          <div>我的购物车</div>
        </template>
      </optBtn>

      <optBtn>
        <template #icon>
          <i class="iconfont">&#xe697;</i>
        </template>
        <template #text>
          <div>下载APP</div>
        </template>
      </optBtn>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import Login from "./childComps/Login";
import Data from "./childComps/Data";
import optBtn from "./childComps/optBtn";

export default {
  name: "Profile",
  components: {
    NavBar,

    Login,
    Data,
    optBtn
  },
  methods: {
    loginClick() {
      this.$router.replace("/register");
    }
  }
};
</script>

<style scoped>
.profile {
  height: 100vh;
  background-color: rgb(242, 242, 242);
}

.profile-nav {
  background-color: var(--color-tint);
  color: #eee;
}

.threeOpts {
  height: 137px;
  margin-top: 17px;
  background-color: #fff;
}

.twoOpts {
  height: calc(100% - 424px);
  margin-top: 17px;
  background-color: #fff;
}
</style>

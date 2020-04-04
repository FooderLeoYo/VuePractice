<template>
  <div class="Register">
    <div class="registerBox">
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
        <div class="title">密码</div>
        <input class="inputBox" type="text" placeholder="请输入密码" v-model="password" />
      </div>
    </div>

    <!-- 注册按钮 -->
    <div class="registerBtn">注册</div>
  </div>
</template>
 
<script>
export default {
  name: "Register",
  data() {
    return {
      phoneNo: "",
      password: ""
    };
  },
  methods: {
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
.Register {
  margin: 25px 0 63.7px;
}

.registerBox {
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
  right: 20px;
  font-size: 5px;
  color: red;
}

.registerBtn {
  margin: 10px auto;
  width: 240px;
  height: 55px;
  line-height: 60px;
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
}
</style>
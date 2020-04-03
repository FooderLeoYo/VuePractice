<template>
  <div class="Register">
    <div class="phoneLoginBox">
      <div class="phone">
        <div class="required">*</div>
        <div class="title">手机号码</div>
        <input class="inputBox" type="text" placeholder="请输入手机号码" v-model="phoneNo" />
      </div>

      <div class="code">
        <div class="required" style="color: red">*</div>
        <div class="title">密码</div>
        <input class="inputBox" type="text" placeholder="请输入密码" v-model="password" />
      </div>

      <div class="loginBtn">注册</div>
    </div>
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
</style>
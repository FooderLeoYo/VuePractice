<template>
  <div class="GetVerCode">
    <a href="javascript:;" @click="sendCode">获取验证码</a>
  </div>
</template>
 
<script>
export default {
  name: "GetVerCode",
  methods: {
    // 发送验证码
    async sendCode() {
      // 1. 验证手机号码格式是否正确：是否是以1开头的10位数字
      if (!/^1\d{10}$/.test(this.phone)) {
        alert("请输入正确的手机号码");
        return;
      }
      // 2. 验证手机号是否被注册
      let data = await isDuplicate(this.phone);
      if (parseInt(data.code) === 0) {
        alert("手机号已被注册，请更换手机号");
        return;
      }
      // 3. 若以上两步验证都通过了，则通知服务器发送验证码
    }
  }
};
</script>
 
<style scoped>
</style>
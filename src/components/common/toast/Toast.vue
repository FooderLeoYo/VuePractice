<template>
  <div class="toast" v-show="isShow">
    <div class="mes">{{message}}</div>
  </div>
</template>
 
<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  methods: {
    toastMes(message = "默认文字", duration = 2000) {
      this.isShow = true;
      this.message = message;

      // 过了duration时间后toast框消失
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>
 
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
}
</style>
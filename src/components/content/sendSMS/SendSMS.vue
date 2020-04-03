<template>
  <div class="SendSMS">
    <div class="requestSMS" v-if="!isSent" @click="sendRequest">获取</div>
    <div class="countdown" v-else>{{countdownNum}}s</div>
  </div>
</template>
 
<script>
export default {
  name: "SendSMS",
  data() {
    return {
      isSent: false,
      countdownNum: 0
    };
  },
  methods: {
    sendRequest() {
      this.isSent = true;
      this.countdownNum = 60;
      this.countdownTimer = setInterval(() => {
        this.countdownNum--;
        if (this.countdownNum === 0) {
          this.isSent = false;
          clearInterval(this.countdownTimer);
        }
      }, 1000);
    }
  }
};
</script>
 
<style scoped>
.SendSMS {
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  border-radius: 3px;
  font-size: 5px;
}

.requestSMS {
  background-color: rgb(10, 191, 104);
}

.countdown {
  background-color: rgba(10, 191, 104, 0.6);
}
</style>
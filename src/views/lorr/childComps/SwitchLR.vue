<template>
  <div class="SwitchLR">
    <div class="L">
      <div class="Litem" @click="changeType('login')" :class="{active: curType === 'login'}">登录</div>
    </div>
    <div class="R">
      <div
        class="Ritem"
        @click="changeType('register')"
        :class="{active: curType === 'register'}"
      >注册</div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "SwitchLR",
  data() {
    return {
      curType: "login"
    };
  },
  methods: {
    changeType(LoinOrRegi) {
      this.curType = LoinOrRegi;
      this.$emit("changeType", LoinOrRegi);
    }
  }
};
</script>
 
<style scoped>
.SwitchLR {
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}

.L,
.R {
  display: inline-block;
  width: 80px;
}

.L {
  margin-left: 58px;
  margin-right: 29px;
}

.R {
  margin-left: 29px;
  margin-right: 58px;
}

.Litem,
.Ritem {
  width: 70px;
  margin: 0 auto;
  text-align: center;
}

.active {
  color: var(--color-high-text);
  border-bottom: 4px solid var(--color-high-text);
}
</style>
<template>
  <div class="optBtn">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="text">
      <div :class="{underline: this.isUnderline}">
        <slot name="text"></slot>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "optBtn",
  props: {
    isUnderline: {
      type: Boolean,
      default() {
        return true;
      }
    }
  }
};
</script>
 
<style scoped>
.optBtn {
  display: flex;
  height: 45px;
  line-height: 45px;
  color: var(--color-text);
}

.icon {
  width: 50px;
  text-align: center;
  color: var(--color-tint);
}

.text {
  width: calc(100% - 50px);
}

.underline {
  border-bottom: rgb(242, 242, 242) 2px solid;
}
</style>
<template>
  <div class="detail"></div>
</template>
 
<script>
export default {
  name: "Detail",
  components: {},
  data() {
    return {
      iid: null
    };
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid; // 动态路由获取到iid
  }
};
</script>
 
<style scoped>
</style>
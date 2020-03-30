<template>
  <div class="CategoryDetail">
    <div class="item" v-for="(item, index) in subCategory.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt />
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "CategoryDetail",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    subCategory: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
 
<style scoped>
</style>
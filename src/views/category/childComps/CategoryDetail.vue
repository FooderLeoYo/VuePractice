<template>
  <div class="CategoryDetail">
    <div class="item" v-for="(item, index) in detailData" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" @load="componentImgLoaded" alt />
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "CategoryDetail",
  props: {
    detailData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    componentImgLoaded() {
      this.$emit("componentImgLoaded");
    }
  }
};
</script>
 
<style scoped>
.CategoryDetail {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}

.item {
  margin: 11px;
  width: 65px;
}

.item-img {
  width: 65px;
}
</style>
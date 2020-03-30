<template>
  <div class="CategoryList">
    <div
      class="categoryListItem"
      v-for="(item, index) in categoryData"
      :key="index"
      @click="listClick(index)"
      :class="{active: index === currentIndex}"
    >{{item.title}}</div>
  </div>
</template>
 
<script>
export default {
  name: "CategoryList",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    categoryData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    listClick(index) {
      this.currentIndex = index;
      this.$emit("listClick", index);
    }
  }
};
</script>
 
<style scoped>
.CategoryList {
  display: flex;
  flex-direction: column;
  width: 110px;
}

.categoryListItem {
  flex: 1;
  height: 47px;
  line-height: 50px;
  text-align: center;
  color: var(--color-text);
  background-color: rgb(246, 246, 246);
}

.active {
  border-left: 5px solid var(--color-tint);
  background-color: #fff;
  color: var(--color-tint);
  font-weight: 900;
}
</style>
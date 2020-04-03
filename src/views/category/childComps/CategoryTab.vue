<template>
  <div class="CategoryTab">
    <div
      class="CategoryTabItem"
      v-for="(item, index) in categoryData"
      @click="tabClick(index)"
      :class="{active: index === currentIndex}"
      :key="index"
    >{{item.title}}</div>
  </div>
</template>
 
<script>
export default {
  name: "CategoryTab",
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
    tabClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>
 
<style scoped>
.CategoryTab {
  display: flex;
  flex-direction: column;
  width: 110px;
}

.CategoryTabItem {
  flex: 1;
  height: 47px;
  line-height: 50px;
  text-align: center;
  color: var(--color-text);
  background-color: rgb(246, 246, 246);
}

.active {
  border-left: 5px solid var(--color-high-text);
  background-color: #fff;
  color: var(--color-high-text);
  font-weight: 900;
}
</style>
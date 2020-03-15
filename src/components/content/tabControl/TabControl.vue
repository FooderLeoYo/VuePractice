<template>
  <div class="tab-control">
    <!-- 这里可以用插槽， -->
    <!-- 但是由于该组件在不同地方被使用时，除了文字内容其他的东西都一样，故也可以用下面的方法 -->
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      :class="{active: index === currentIndex}"
      @click="tabClick(index)"
      :key="item.id"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
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
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 1px solid var(--color-tint);
}
</style>
<template>
  <!-- 这个组件首先使用了TabBar -->
  <!-- 然后往TabBar的空插槽里插入4个TabBarItem组件，并绑定一个path属性用以判断当前item是否是活跃item -->
  <tab-bar>
    <tab-bar-item path="/home">
      <template #item-icon>
        <img src="~assets/img/tabbar/home.svg" alt />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt />
      </template>
      <template #item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template #item-icon>
        <img src="~assets/img/tabbar/category.svg" alt />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg" alt />
      </template>
      <template #item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template #item-icon>
        <img src="~assets/img/tabbar/shopcart.svg" alt />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/shopcart_active.svg" alt />
      </template>
      <template #item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template #item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt />
      </template>
      <template #item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import { TabBar, TabBarItem } from "components/common/tabbar";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
</style>

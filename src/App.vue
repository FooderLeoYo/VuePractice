<template>
  <div id="app">
    <!-- keep-alive作用：当用户在不同路由间跳转时，之前浏览的内容不会被销毁 -->
    <!-- 但是详情页需要每次离开后重新进入时是新的页面，所以要排除Detail -->
    <keep-alive exclude="Detail">
      <!-- router-view是router的一个预定义组件，因此可以直接拿来用 -->
      <!-- 这里用的是路由代码跳转方式进行跳转而不是router-link，跳转代码在TabBarItem中 -->
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "assets/css/base.css"; /* style中使用路径别名需要加@ */
</style>

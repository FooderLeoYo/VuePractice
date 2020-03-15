// 这个文件是对BScroll进行封装
// 外部需要使用滚动功能时，是面向Scroll.vue而不是直接面向BScroll
// 这样做的目的是万一BScroll停止维护了，我们只需要修改Scroll.vue中的内容，而不需要修改项目代码

<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
 
<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null // 用于存放new的BScroll实例
    };
  },
  props: {
    probeType: {
      // 监听方式类型
      type: Number,
      default: 0
    },
    pullUpLoad: {
      // 是否需要监听上拉加载
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 设置为true后包裹在scroll里的内容才能被点击
      probeType: this.probeType, // 第一个probeType是BScroll的属性，第二个是props里的probeType
      pullUpLoad: this.pullUpLoad
    });
    // 2. 获取到当前滚动的位置，并向外暴露
    // 给scroll绑定一个scroll（发生滚动时会被触发，BScroll内置，非自定义）事件
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    // 3. 监听拉到底部
    // 给scroll绑定一个pullingUp（滚动到底部时会被触发，BScroll内置，非自定义）事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    // time=300是es6语法，即给参数赋一个默认值
    scrollTo(x, y, time = 300) {
      // scrollTo()为内置方法（上一行的方法名只是自定义成正好与它相同），前两个参数是位置坐标，第三个参数是动画时间（ms）
      // 加this.scroll &&是为了判断scroll是否已被加载，若否则不执行scrollTo方法以免报错
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // BScroll默认只能上拉加载一次
    // 要实现多次上拉加载，则要调用finishPullUp方法告知已加载完成
    finishPullUp() {
      this.scroll.finishPullUp();
    },

    // 解决BScroll无法完整拉动bug
    // 原理：有时由于图片加载速度慢，BScroll在计算可滑动高度时得到的是无图片的高度，显然小于真实高度
    // 解决方案就是通过在GoodsListItem图片加载完成后刷新可滑动高度，从而得到包含图片的真实高度
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>
 
<style scoped>
</style>
// 这个文件利用混入，封装了一些在多处被复用的代码

import { debounce } from "common/utils";

import BackTop from "components/content/backTop/BackTop";

// 图片加载完成则刷新，解决BScroll有时无法拉动的BUG
export const imgLoadMixin = {
  mounted() {
    // 将调用刷新放进防抖函数中，生成一个带防抖的新函数
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("this.ifImgLoaded", () => {
      // 刷新时调用的是我们生成的带防抖的新函数，而不是直接调用scroll原生的refresh
      refresh();
    });
  },
}

// 回到顶部
export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      ifShowBackTop: false, // 改属性决定是否显示“回到顶部”按钮，默认不显示
    }
  },
  methods: {
    // 设置“回到顶部”按钮所返回的位置以及动画时间
    backClick() {
      // 通过refs拿到scroll组件，进而调用scroll内部的scrollTo方法
      // scrollTo方法在Scroll.vue中
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  },
}
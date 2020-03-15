<template>
  <div id="home">
    <NavBar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </NavBar>
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" />
      <RecommendView :recommends="recommends" />
      <FeatureView />
      <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <GoodsList :goods="showGoods" />
    </Scroll>
    <!-- 1. back-top组件绑定click.native点击事件，发生点击时会调用backClick拿到scroll组件 -->
    <!-- 2. 进而通过调用scroll内部的scrollTo方法实现返回顶部效果-->
    <!-- 3.backClick通过混入抽取到mixin中了 -->
    <!--  这里要监听的是自定义组件back-top而不是按钮之类的原生组件，故要加.native -->
    <BackTop @click.native="backClick" v-show="ifShowBackTop" />
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from "network/home";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goodsList/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop", // goods的当前类型，默认是pop
      ifShowBackTop: false, // 是否显示回到顶部
      tabOffsetTop: 0, // tabControl距离顶部的距离
      isTabFixed: false, // 决定tabControl是否吸顶
      leaveY: 0 // 用户离开首页时，记录下当前浏览到的位置
    };
  },
  created() {
    // 初始化时调用网络请求，拿到各项数据
    // 这里调用的是methods里的方法而不是network的，分离的目的是为了使代码结构更清晰
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1. GoodsListItem中图片加载完成则刷新
    // 将调用刷新放进防抖函数中
    const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    // homeItemImageLoad方法在GoodsListItem中
    this.$bus.$on("homeItemImgLoad", () => {
      refresh();
    });
  },
  methods: {
    // 以下为事件监听相关方法

    // tabControl被点击时被调用
    tabClick(index) {
      // 1. 将currentType动态设置为当前所点击的类型
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    // 设置“回到顶部”按钮所返回的位置以及动画时间
    backClick() {
      // 通过refs拿到scroll组件，进而调用scroll内部的scrollTo方法
      // scrollTo方法在Scroll.vue中
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },

    // 发生滚动时的可能会调用的相关方法
    contentScroll(position) {
      // 1. 决定是否显示“回到顶部”
      // 当向下滚动距离大于1000时隐藏“回到顶部”
      // 由于向下y是负的，所以position前要加负号
      this.ifShowBackTop = -position.y > 1000;
    },

    // 拉到底部继续上拉时被调用，调用getHomeGoods加载更多数据
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    // 防抖动：避免每个GoddsListItem图片加载成功就refresh一次,而是设定一个delay时间，
    // 在delay时间内如果有新的图片加载则不会refresh，而是等到超过delay都没有新图才会refresh
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        // 未发送过请求时timer为null，if (timer)为false，则不执行clearTimeout而往下执行setTimeout，
        // 执行了setTimeout之后timer便不为null了，如果在delay时间内发生了新的请求则
        //  if (timer)为true，执行clearTimeout重设定时器
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    // 以下为网络请求相关方法

    // 这个getHomeMultidata是Home的methods的自定义方法
    getHomeMultidata() {
      // 这个getHomeMultidata是network中的
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 这个方法会在页面首次加载，以及每次上拉加载时被调用
    getHomeGoods(type) {
      // 每次发送新的网络请求其实就是需要加载下一页的数据，故page+1
      const page = this.goods[type].page + 1;
      // 这个getHomeGoods是network中的方法
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list); // es6的剩余参数语法
        this.goods[type].page += 1; // 将当前页面数更新为刷新以后的页面数
        this.$refs.scroll.finishPullUp(); // 上拉加载一次后告知已加载完成
      });
    }
  },
  computed: {
    // 由于放在组件中的话语句太长，所以新建了一个showGoods方法放到了computed中
    showGoods() {
      return this.goods[this.currentType].list;
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;
  /* 这里通过定位的方式实际上给了content一个高度 */
  /* 从而满足了使用BScroll必须要content高度大于wrapper的要求 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>


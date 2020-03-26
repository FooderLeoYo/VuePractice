<template>
  <div id="home">
    <NavBar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </NavBar>
    <!-- 在scroll外面又放一个tab-control是因为scroll里面那个tab-control会随着上拉一起往上跑，无法吸顶 -->
    <!-- 原因是BScroll是通过transform: translate来实现滚动，而即使设置了fixed的元素transform后依然会动 -->
    <!-- 外面的这个tab-control一开始是隐藏的，屏幕上拉到scroll里面那个tab-control的位置时正好显示出来 -->
    <TabControl
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlOut"
      class="tab-control"
      v-show="isTabFixed"
    />
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" @swiperImageLoad="offsetWithImg" />
      <RecommendView :recommends="recommends" />
      <FeatureView />
      <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControlIn" />
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

import { imgLoadMixin, backTopMixin } from "common/mixin";

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
      tabOffsetTop: 0, // tabControl距离顶部的距离
      isTabFixed: false, // 控制tabControl是否吸顶
      leaveY: 0, // 用户离开首页时，记录下当前浏览到的位置
      ifImgLoaded: "homeItemImgLoad" // 图片是否加载完
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
  // 用户离开首页时，记录下离开时的位置
  deactivated() {
    this.leaveY = this.$refs.scroll.scroll.y;
  },
  // 用户再次回到首页时，跳转到上次位置，解决回到首页有时会返回最顶部而不是之前的位置的问题
  // 并刷新页面防止出现无法拖动等bug
  activated() {
    this.$refs.scroll.scrollTo(0, this.leaveY, 1); /* 最后一个参数给0会无效 */
    this.$refs.scroll.refresh();
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

      // 2. 将scroll外面的tabControl与里面的tabControl的同步
      this.$refs.tabControlIn.currentIndex = index;
      this.$refs.tabControlOut.currentIndex = index;
    },

    // 发生滚动时的可能会调用的相关方法
    contentScroll(position) {
      // 1. 决定是否显示“回到顶部”
      // 当向下滚动距离大于1000时隐藏“回到顶部”
      // 由于向下y是负的，所以position前要加负号
      this.ifShowBackTop = -position.y > 1000;

      // 2. 决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    // 拉到底部继续上拉时被调用，调用getHomeGoods加载更多数据
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    // 在tabControl上面的那些图片加载完后，获取tabControl距离顶部的距离
    offsetWithImg() {
      // 1. 组件本身是没有offset的，只有组件内部的div等有，但所有组件都有一个属性$el，用于获取组件的元素
      // 2. 图片有时加载太慢，如果一开始就获取tabOffsetTop可能图片还没加载，数值偏小；
      // 所以要等轮播图加载完后swiperImageLoad被调用了，才去获取tabOffsetTop
      // 3。 所有图片中，轮播图图片基本是最后加载的；
      // 并且轮播图只要其中一张图加载，整个轮播图的高度也确定了（另外三张即使没加载也不会占用下方高度）；
      // 因此只要轮播图加载了一张图，整个页面包含图片时的高度就确定了
      this.tabOffsetTop = this.$refs.tabControlIn.$el.offsetTop;
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
  },
  mixins: [imgLoadMixin, backTopMixin]
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #eee;
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


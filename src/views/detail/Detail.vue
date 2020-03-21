<template>
  <div class="detail">
    <DetailNavBar class="detail-nav" ref="nav" @titleClick="titleClick" />
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailCommentInfo :comment-info="commentInfo" ref="comment" />
      <DetailParamInfo :param-info="paramInfo" ref="params" />
      <DetailGoodsInfo :detailInfo="detailInfo" @detailImgLoad="detailImgLoad" />
      <GoodsList :goods="recommends" ref="recommend" />
    </Scroll>
    <BackTop @click.native="backClick" v-show="ifShowBackTop" />
    <DetailBottomBar @addToCart="addToCart" />
  </div>
</template>
 
<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommand
} from "network/detail";

import { mapActions } from "vuex";

import { debounce } from "common/utils";
import { imgLoadMixin, backTopMixin } from "common/mixin";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goodsList/GoodsList";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

export default {
  name: "Detail",
  components: {
    Scroll,
    GoodsList,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailCommentInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    DetailBottomBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      ifImgLoaded: "detailItemImgLoad",
      themeTopYs: [],
      getThemeTopY: null
    };
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid; // 动态路由获取到iid

    //2. 根据iid请求商品详情数据,，getDetail为network中的detail.js中的函数
    getDetail(this.iid).then(res => {
      // 1. res.result中有我们需要的各种数据，将它存到data变量中，接下来写起来方便
      const data = res.result;
      // 2. 获取顶部轮播图图片
      this.topImages = data.itemInfo.topImages;

      // 3. 创建商品对象
      // goods是Detail.vue的data中的属性，Goods是network中detail.js中的自定义类
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4. 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 5. 获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 6. 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7. 获取评论信息
      // 有些商品可能没有评论，因此要先判断是否有评论
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3. 请求推荐数据，getRecommand为network中的detail.js中的函数
    getRecommand().then(res => {
      this.recommends = res.data.list;
    });

    // 4. 给getThemeTopY添加防抖功能
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); // 为了解决contentScroll方法中getThemeTopY[i + 1]可能会越界问题
    }, 100);
  },
  methods: {
    // 图片加载完后执行的相关方法
    detailImgLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY(); // 图片加载完后获取各部分距离顶部的距离
    },

    // 发生滚动时调用的相关方法
    contentScroll(position) {
      // 1. 滚到某个区域时，导航栏标题对应改变
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          break;
        }
      }

      // 2. 发生滚动时实时监听是否需要显示回到顶部
      this.ifShowBackTop = -position.y > 1000;
    },

    // 点击导航标题滚到对应内容区域
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },

    // 这里用到了mapActions导入actions.js中的addCart，之后就可以像调用一般方法一样地调用addCart了
    ...mapActions(["addCart"]),
    // 加入购物车
    addToCart() {
      //1. 获取购物车需要展示的数据
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2. 将商品添加到购物车里，本质是添加到了vuex的store中
      // 这里用到Vuex，原因是：
      // 一、Detail和购物车之间无父子关系，虽然可以通过中央事件总线实现数据传递，但有可能点击添加时购物车还没被创建
      // 二、别的组件可能也会用到购物车中的信息，则又需要考虑新的数据传递问题，索性直接统一临时放到Vuex中
      this.addCart(product).then(res => {
        // toast是弹出窗
        // 是components/common中的自定义全局组件
        this.$toast.toastMes(res);
      });
    }
  },
  computed: {
    showImage() {
      // 由于这个组件同时被Home和Detail使用，故两者的src都要写
      // 第一个src时Detail的，第二个是GoodsListItem的，即根据传过来的是src动态决定img的src
      return this.product.image || this.product.show.img;
    }
  },
  mixins: [imgLoadMixin, backTopMixin]
};
</script>
 
<style scoped>
.detail {
  /* 将MainTabBar盖住 */
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  /* 为了给nav一个z-index，使顶部导航不被BScroll滚动内容挡住， */
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
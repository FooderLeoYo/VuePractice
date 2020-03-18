<template>
  <div class="detail">
    <DetailNavBar class="detail-nav" />
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailCommentInfo :comment-info="commentInfo" ref="comment" />
      <DetailParamInfo :param-info="paramInfo" ref="param" />
      <DetailGoodsInfo :detailInfo="detailInfo" @detailImgLoad="detailImgLoad" />
      <GoodsList :goods="recommends" ref="recommend" />
    </Scroll>
    <BackTop @click.native="backClick" v-show="ifShowBackTop" />
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
    DetailGoodsInfo
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
      ifImgLoaded: "detailItemImgLoad"
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
  },
  methods: {
    detailImgLoad() {
      this.$refs.scroll.refresh();
    },
    contentScroll(position) {
      this.ifShowBackTop = -position.y > 1000;
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
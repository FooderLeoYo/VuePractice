<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" alt />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      // 轮播图有四张图，如果每张图加载完成都向外发送就太频繁了
      // 这里只要4张图中任意一张加载完成即向外发送，因为此时轮播图部分的高度已确定，我们的目的也就达到了
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>

<template>
  <div class="category">
    <TopBar class="categoryTopBar">
      <template #center>
        <div>商品分类</div>
      </template>
    </TopBar>
    <Scroll class="tabContent" ref="tabScroll">
      <CategoryTab class="CategoryTab" :categoryData="categoryData" @tabClick="tabClick" />
    </Scroll>
    <Scroll class="detailContent" ref="detailScroll">
      <CategoryDetail
        class="CategoryDetail"
        :detailData="detailData"
        @componentImgLoaded="componentImgLoaded"
      />
    </Scroll>
  </div>
</template>

<script>
import { getCategory, getDetail } from "network/category";

import { debounce } from "common/utils";

import TopBar from "components/common/topbar/TopBar";
import Scroll from "components/common/scroll/Scroll";

import CategoryTab from "./childComps/CategoryTab";
import CategoryDetail from "./childComps/CategoryDetail";

export default {
  name: "Category",
  components: {
    TopBar,
    Scroll,

    CategoryTab,
    CategoryDetail
  },
  data() {
    return {
      categoryData: [],
      categoryDetailData: [],
      currentIndex: 0,
      categoryImgLoaded: null
    };
  },
  created() {
    // 网络请求拿到数据
    getCategory().then(res => {
      this.categoryData = res.data.category.list;
      // CategoryDetai需要的数据不在categoryData中，需要根据maitKey才能拿到
      // 获取index=0的数据，做初始化
      this.getDetailData(0);
    });
  },
  mounted() {
    // 将刷新函数装进防抖中
    this.categoryImgLoaded = debounce(() => {
      this.$refs.detailScroll.refresh();
    });
  },
  methods: {
    getDetailData(index) {
      getDetail(this.categoryData[index].maitKey).then(res => {
        this.categoryDetailData[index] = res.data.list;
        // 能加快加载速度
        this.categoryDetailData = [...this.categoryDetailData];
      });
    },
    // 点击CategoryList
    tabClick(index) {
      this.currentIndex = index;
      this.getDetailData(this.currentIndex);
    },
    // 图片加载完后调用categoryImgLoad刷新页面
    componentImgLoaded() {
      this.categoryImgLoaded();
    }
  },
  computed: {
    detailData() {
      return this.categoryDetailData[this.currentIndex];
    }
  }
};
</script>

<style scoped>
.category {
  position: relative;
  height: 100vh;
}

.categoryTopBar {
  background-color: var(--color-tint);
  color: #eee;
}

.tabContent,
.detailContent {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}

.tabContent {
  left: 0;
  right: calc(100% - 110px);
}

.detailContent {
  left: 110px;
  right: 0;
}
</style>

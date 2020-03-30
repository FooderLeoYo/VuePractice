<template>
  <div class="category">
    <TopBar class="categoryTopBar">
      <template #center>
        <div>商品分类</div>
      </template>
    </TopBar>
    <div class="main">
      <CategoryList class="CategoryList" :categoryData="categoryData" @listClick="listClick" />
      <CategoryDetail
        class="CategoryDetail"
        :subCategory="subCategory"
        :currentIndex="currentIndex"
      />
    </div>
  </div>
</template>

<script>
import { getCategory, getSubCategory } from "network/category";

import TopBar from "components/common/topbar/TopBar";

import CategoryList from "./childComps/CategoryList";
import CategoryDetail from "./childComps/CategoryDetail";

export default {
  name: "Category",
  components: {
    TopBar,

    CategoryList,
    CategoryDetail
  },
  data() {
    return {
      categoryData: [],
      categoryDisplay: {},
      currentIndex: -1
    };
  },
  created() {
    // 网络请求拿到数据
    getCategory().then(res => {
      this.categoryData = res.data.category.list;
      let len = this.categoryData.length;
      for (let i = 0; i < len; i++) {
        this.categoryDisplay[i] = {
          catType: {}
        };
      }
      // CategoryDetai需要的数据不在categoryData中，需要根据maitKey才能拿到
      // new Promise((resolve, reject) => {
      //   let len = this.categoryData.length;
      //   for (let i = 0; i < len; i++) {
      //     getSubCategory(this.categoryData[i].maitKey).then(res => {
      //       this.categoryDisplay[i] = res.data.list;
      //     });
      //     resolve(this.categoryDisplay);
      //   }
      // }).then(res => {
      //   console.log(res);
      // });
      this.getDisplayData(0);
    });
  },
  mounted() {
    // console.log(this.categoryDisplay);
    // console.log(this.categoryDisplay);
    // console.log(this.categoryDisplay[0]);
  },
  methods: {
    getDisplayData(index) {
      this.currentIndex = index;
      getSubCategory(this.categoryData[index].maitKey).then(res => {
        this.categoryDisplay[index].catType = res.data;
        this.categoryDisplay = { ...this.categoryDisplay };
      });
    },
    // 列表点击
    listClick(index) {
      this.currentIndex = index;
      this.getDisplayData(index);
    }
  },
  computed: {
    subCategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryDisplay[this.currentIndex].catType;
    }
  }
};
</script>

<style scoped>
.category {
  height: 100vh;
}

.categoryTopBar {
  background-color: var(--color-tint);
  color: #eee;
}
</style>

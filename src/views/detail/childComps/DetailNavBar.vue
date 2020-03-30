<template>
  <div>
    <TopBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          class="title-item"
          :class="{active:index===currentIndex}"
          @click="changeCurIdx(index)"
          :key="index"
        >{{item}}</div>
      </div>
    </TopBar>
  </div>
</template>

<script>
import TopBar from "components/common/topbar/TopBar";
export default {
  name: "DetailNavBar",
  components: {
    TopBar
  },
  data() {
    return {
      titles: ["商品", "评论", "参数", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    changeCurIdx(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 11px;
}
</style>
<template>
  <div class="cart">
    <TopBar class="nav-bar">
      <template #center>
        <div>购物车({{cartLength}})</div>
      </template>
    </TopBar>
    <Scroll class="content" ref="scroll">
      <CartList />
    </Scroll>
    <CartBottomBar />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TopBar from "components/common/topbar/TopBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

export default {
  name: "Cart",
  components: {
    TopBar,
    Scroll,

    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(["cartLength"])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>

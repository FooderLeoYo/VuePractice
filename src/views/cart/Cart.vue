<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <template #center>
        <div>购物车({{cartLength}})</div>
      </template>
    </NavBar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Cart",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(["cartLength"])
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
</style>

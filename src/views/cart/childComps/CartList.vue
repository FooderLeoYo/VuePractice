<template>
  <div class="cart-list">
    <CartListItem v-for="(item, index) in cartList" :itemInfo="item" :key="index" />
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>
 
<style scoped>
</style>
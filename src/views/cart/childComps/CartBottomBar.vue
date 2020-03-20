<template>
  <div class="bottom-bar">
    <div class="check-content">
      <checkButton :isChecked="ifSelectAll" class="check-button" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    checkButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    ifSelectAll() {
      if (this.cartList.length === 0) return false;
      // 只要找到一个没checked的，ifSelectAll就是false
      return !this.cartList.find(item => !item.checked);
    },
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    }
  },
  methods: {
    checkClick() {
      if (this.ifSelectAll) {
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品");
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  /* position: relative; */
  /* bottom: 40px; */
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: rgb(250, 80, 1);
  color: #fff;
  text-align: center;
}
</style>
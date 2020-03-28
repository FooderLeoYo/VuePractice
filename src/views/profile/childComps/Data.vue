<template>
  <!-- 3个数据 -->
  <div class="data">
    <!-- 余额 -->
    <div class="balance">
      <div class="quantity">
        <span class="number">0.00</span>
        <span class="unit">元</span>
      </div>
      <span class="dataDes">我的余额</span>
    </div>
    <!-- 优惠券 -->
    <div class="coupons">
      <div class="quantity">
        <span class="number">0</span>
        <span class="unit">个</span>
      </div>
      <span class="dataDes">我的优惠</span>
    </div>
    <!-- 积分 -->
    <div class="credits">
      <div class="quantity">
        <span class="number">0</span>
        <span class="unit">分</span>
      </div>
      <span class="dataDes">我的积分</span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "Data"
};
</script>
 
<style scoped>
.data {
  display: flex;
  height: 80px;
  color: #000;
  background-color: #fff;
  color: var(--color-text);
}

.balance,
.coupons,
.credits {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
}

.balance,
.coupons {
  border-right: rgb(242, 242, 242) 2px solid;
}

.quantity,
.dataDes {
  flex: 1;
}

.number {
  font-size: 25px;
  color: var(--color-high-text);
}

.quantity {
  padding-top: 17px;
}
</style>
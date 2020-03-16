<template>
  <div class="goods-item" @click="itemClick">
    <!--@load获取到图片加载完成的时机后，调用imageLoad  -->
    <img :src="goodsItem.show.img" @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 当前GoodsListItem的图片加载完后，被img元素绑定的load事件调用，
    // 作用是向外告知当前GoodsListItem的图片已加载完成
    imageLoad() {
      // 1. $bus是事件总线
      // 2. Home和GooddsListItem是爷孙关系，数据传递麻烦，故采用事件总线实现直接通信
      // 3. 这个组件同时被Home和Detail使用，而当Home或Detail其中一方的图片加载完时不应该通知另外一方
      // 故加if判断，实现只通知自己
      this.$bus.$emit("homeItemImgLoad");
    },

    // 点击GoodsListItem后跳转到详情页
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid); // 用动态路由的方式拿到详情页id
    }
  }
};
</script>
 
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

// mutations中的每个方法尽可能只完成一件事，这是因为：
// 如果旧商品数量加1和添加新商品都在同一个mutations方法中，在devtools中就无法区分方法被调用时是因为哪种情况
// 因此才将判断放在actions中，判断后再根据情况调用addCounter或addToCart
// 这样我们就能从devtools中根据被调用的是addCounter还是addToCart区分是旧商品还是新商品了
export default {
  // 当放进购物车的商品是旧的种类时，该商品数量加一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },

  // 当放进购物车的商品是新的种类时，在cartList中添加这种新商品
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
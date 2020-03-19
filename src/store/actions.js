import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1. 查找之前数组中是否有该商品
      //  find是数组方法，含义是：遍历cartList的item后如果找到item.iid === payload.iid，则将item返回给oldProduct
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2. 判断添加的商品是否是已经添加过的种类
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1 // 给payload新建count属性并赋值为1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新商品')
      }
    })
  }
}
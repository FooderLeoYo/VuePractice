// 这个文件的作用：导出的两个东西会在多个地方被使用，因此封装起来，用的使用只需要简单地写名字
// 其实这也是getters一般的作用：将一些store中被多次使用的属性封装起来，减少取用这些属性时的代码量

export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}
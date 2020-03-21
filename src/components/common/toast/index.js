// 这个文件的作用：以“插件方式”封装toast组件，而不是components下其他组件的普通封装方式
// 插件式封装的目的是为了减少使用该组件时的代码量

import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2. new一个组件对象
  const toast = new toastConstructor()

  // 3. 将组件对象，手动挂载到某一个div上
  toast.$mount(document.createElement('div'))

  // 4. 将新建的div添加到document中
  document.body.appendChild(toast.$el)

  // 5. 将Toast定义为全局组件
  // 注意这里toast一定要小写，因为13行我们new的时候是小写
  Vue.prototype.$toast = toast
}

export default obj
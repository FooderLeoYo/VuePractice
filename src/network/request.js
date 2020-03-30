// 这个文件为其他network里的请求文件提供baseurl，响应时间，拦截器

import axios from 'axios'

// 这里的导出方式选择导出函数而不是default是因为：有可能需要导出多个实例，而default只能导出一个
// request是自定义名
// config也是自定义名，供传入一个对象，对象中可包含url、成功时的方法、失败时的方法等
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/h3',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  // instance本身就是一个promise对象
  return instance(config)
}

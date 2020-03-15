// 这个文件负责：当首页需要数据时，返回url
// 首页拿到url后便可进行对应的网络请求

import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    // 地址会按baseurl + url + params进行拼接
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}
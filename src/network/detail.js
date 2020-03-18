// 这个文件负责：当详情页需要数据时，返回url
// 详情页拿到url后便可进行对应的网络请求

import { request } from "./request"

export function getDetail(iid) {
  return request({
    url: 'detail',
    params: {
      iid
    }
  })
}

export function getRecommand() {
  return request({
    url: '/recommend'
  })
}

// 由于商品信息太多且分散，故整合成一个自定义类Goods
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shoplogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // Images可能没有值（某些商品有值，某些没有值）
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }

}
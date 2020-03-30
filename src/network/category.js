import { request } from './request'

export function getCategory() {
  return request({
    url: '/category'
  })
}

// CategoryDetai需要的数据不在categoryData中，需要根据maitKey才能拿到
export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
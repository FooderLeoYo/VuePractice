// 由于swiper下包含两个子组件，若没有这个index.js，则其他组件在import时要写两行
// 而现在只需要写：import { Swiper, SwiperItem } from "components/common/swiper";
// 路径只写到文件夹而不是具体文件，调用者会自己去该文件夹中找{}中的所有组件

import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

export {
  Swiper, SwiperItem
}

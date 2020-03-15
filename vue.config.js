module.exports = {
  configureWebpack: {
    resolve: {
      alias: { // 以下均为自定义的路径别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
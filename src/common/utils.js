// 这个文件的作用是封装一些全局都有可能使用到的函数

// 防抖动：避免每个GoddsListItem图片加载成功就refresh一次,而是设定一个delay时间，
// 在delay时间内如果有新的图片加载则不会refresh，而是等到超过delay都没有新图才会refresh
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    // 未发送过请求时timer为null，if (timer)为false，则不执行clearTimeout而往下执行setTimeout，
    // 执行了setTimeout之后timer便不为null了，如果在delay时间内发生了新的请求则
    //  if (timer)为true，执行clearTimeout重设定时器
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // 这里用apply方法而不是直接调用scroll.refresh是因为我们还可以给func传其他的函数实现其他函数的防抖
      // apply方法作用是把func中的内容继承给往上数3行我们return的那个function
      // 即把scroll的refresh方法复制一份给function，然后赋值给mounted中const定义的refresh
      // (this, args)时apply方法语法规定的两个可选参数
      // this：mounted中const定义的refresh；args：mounted中refresh()时可传参数
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 格式化函数 ， 给日期格式化
 * date为 new Date()对象， fmt为 'yyyy-MM-dd'的格式
 */
export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    let dateY = date.getFullYear() + "";
    //RegExp.$1 在判断中出现过，且是括号括起来的，所以 RegExp.$1 就是 "yyyy"
    fmt = fmt.replace(RegExp.$1, dateY.substr(4 - RegExp.$1.length));
  }

  //获取其他
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
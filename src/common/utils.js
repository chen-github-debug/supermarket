//防抖函数
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


//时间戳方法
export function formatDate(date, fmt) {
  //1 获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2 获取时间格式化分割
  // M+ ->正则表达式规则，+表示最少一个（一个或多个M）
  // * :表示0个或者多个
  // ? :表示0个或者1个
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

//补0算法，也可以直接判断是2位还是1位，如果是1位则前面补0
function padLeftZero (str) {
  //04：04：04
  return ('00' + str).substr(str.length);
}


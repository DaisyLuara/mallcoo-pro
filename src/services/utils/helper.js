import Vue from 'vue'
Vue.prototype.$innerHeight = () => {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  )
}

Vue.prototype.$innerWidth = () => {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  )
}

Vue.prototype.$qiniuCompress = percent => {
  if (typeof percent !== 'number') {
    return '?imageView2/0/q/30'
  } else {
    return percent > 100 || percent < 0
      ? '?imageView2/0/q/30'
      : '?imageView2/0/q/' + String(percent)
  }
}

// 全局帮助方法 可以直接  this. 引用
// 加入$ 避免和Vue本身的实例冲突

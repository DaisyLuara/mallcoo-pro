export * from './utils/index'
export * from './common/index'
export * from './marketing/index'
export * from './wechat/index'

// 用法

// 直接 import  { 方法名 } from 'services'
// 比如 import { $wechat, getInfoById } from 'services'
// 所有的方法分类在/services文件下
// 比如/services/common
// '/services/common/index.js'是这一类方法的聚合入口
// 举例 '/services/common/track.js'则是所有追踪方法的地方
// import { basicTrack } from 'services' 实际上是 引用了 '/services/common/track.js' 里面的 basicTrack 方法

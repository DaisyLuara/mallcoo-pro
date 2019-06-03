// 拆分成按照日期排列的路由配置
let marketingRouter = [
  {
    path: 'dreamland',
    location: 'Dreamland',
    name: 'dreamland',
    meta: {
      title: '星视度',
      author: 'lipan',
      desc: '幻境'
    },
    isAbandoned: false
  },
  {
    path: 'wys',
    location: 'wuyue',
    name: 'wys',
    meta: {
      title: '我爱你五月，I ♡ may',
      author: 'lipan',
      desc: '吾悦-金币第二期'
    },
    isAbandoned: false
  },
  {
    path: 'wys_share',
    location: 'wuyueShare',
    name: 'wys_share',
    meta: {
      title: '我爱你五月，I ♡ may',
      author: 'lipan',
      desc: '吾悦-金币第二期-分享'
    },
    isAbandoned: false
  }
]
export default marketingRouter

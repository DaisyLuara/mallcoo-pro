import wx from 'weixin-js-sdk'
import axios from 'axios'
import { isiOS } from '@/services'

const share = shareObject => {
  // utm_term 为分享统计标记
  let link = ''

  if (shareObject.link) {
    link =
      shareObject.link.indexOf('?') > -1
        ? shareObject.link + `&share_at=${Date.now()}&utm_term=wechat_share`
        : shareObject.link + `?share_at=${Date.now()}&utm_term=wechat_share`
  } else {
    link =
      window.location.href.indexOf('?') > -1
        ? window.location.href + `&share_at=${Date.now()}&utm_term=wechat_share`
        : window.location.href + `?share_at=${Date.now()}&utm_term=wechat_share`
  }
  shareObject.link = link
  // 显示所有功能接口
  // wx.showAllNonBaseMenuItem()

  wx.onMenuShareAppMessage(shareObject)
  wx.onMenuShareTimeline(shareObject)
  wx.onMenuShareQQ(shareObject)
  wx.onMenuShareWeibo(shareObject)
  wx.onMenuShareQZone(shareObject)
}

const forbidden = () => {
  // 禁止分享
  wx.hideOptionMenu()
  wx.hideMenuItems({
    menuList: [
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  })
}

// 微信扫一扫
const qRCode = scanQrCodeObject => {
  wx.scanQRCode(scanQrCodeObject)
}

const $wechat = weixinUrl => {
  return new Promise((resolve, reject) => {
    let requestUrl = process.env.VUE_APP_WX_API + '/wx/officialAccount/sign'
    // 仅iOS设备需要传入
    let params = {}
    if (weixinUrl && isiOS) {
      params = {
        params: {
          weixinUrl: encodeURIComponent(weixinUrl.split('#')[0])
        }
      }
    }
    axios
      .get(requestUrl, params)
      .then(response => {
        // sign返回格式
        let r = response.data.data
        wx.config({
          debug: false,
          appId: r.appId,
          timestamp: r.timestamp,
          nonceStr: r.nonceStr,
          signature: r.signature,
          jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'hideOptionMenu',
            'scanQRCode'
          ]
        })
        wx.ready(() => {
          // 配置 wx.config 成功
          resolve({
            wx,
            share,
            forbidden,
            qRCode
          })
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 书写示例

// 分享
// $wechat()
//   .then(res => {
//     res.share({
//       // 配置分享
//       title: 'wechat-spa',
//       desc: 'Wechat SPA',
//       link: window.location.href,
//       imgUrl: 'https://www.baidu.com/img/bd_logo1.png',
//       不要忘记加入success回调统计分享成功
//       success: function() {
//         customTrack.shareWeChat()
//       }
//     })
//   })
//   .catch(_ => {
//     console.warn(_.message)
//   })

// 禁止分享
// $wechat()
//   .then(res => {
//     res.forbidden()
//   })
//   .catch(_ => {
//     console.warn(_.message)
//   })

export { $wechat }

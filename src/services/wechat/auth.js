import { Cookies } from '@/services'
import axios from 'axios'
const WX_API = process.env.VUE_APP_WX_API

const getWxUserInfo = () => {
  let url = WX_API + '/wx/officialAccount/user?v=' + new Date().getTime()
  return new Promise((resolve, reject) => {
    let userId = Cookies.get('user_id')
    let params = {
      params: {
        user_id: userId
      },
      withCredentials: true
    }
    axios
      .get(url, params)
      .then(res => {
        let wdata = res.data
        resolve(wdata)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 当code state 过期时候需要处理
const NaviToWechatAuth = customUrl => {
  const appid = 'wx63bd0a98ca1b6251'
  const redirect_uri = encodeURIComponent(customUrl || window.location.href)
  const state = 'openid'
  const url =
    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
    appid +
    '&redirect_uri=' +
    redirect_uri +
    '&response_type=code&scope=snsapi_base&state=' +
    state +
    '#wechat_redirect'
  window.location.href = url
}

const getUserInfoByCodeAndState = (code, state) => {
  // 0151.H5通行证-我的信息
  const request_url = `${process.env.VUE_APP_EXE_API}/h5/wxuserinfo/`
  const request_params = {
    params: {
      code: code,
      state: state,
      api: 'json'
    }
  }
  return new Promise((resolve, reject) => {
    axios
      .get(request_url, request_params)
      .then(r => {
        resolve(r)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export { getWxUserInfo, NaviToWechatAuth, getUserInfoByCodeAndState }

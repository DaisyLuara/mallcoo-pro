import { Cookies } from '@/services'
import axios from 'axios'
const WX_API = process.env.VUE_APP_WX_API
const WX_USER_API = process.env.VUE_APP_WX_USER_API
const GET_USER_DATA_URL = WX_USER_API + '/wx/officialAccount/user'
const V2_HEADER = {
  headers: {
    Accept: 'application/vnd.saas.v2+json'
  }
}
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

// 静默授权
const handleWechatAuth = (url, headers = 'v2') => {
  let base = encodeURIComponent(String(url))
  let redirect =
    WX_API +
    '/' +
    headers +
    '/wx/officialAccount/oauth?url=' +
    base +
    '&scope=snsapi_base'
  window.location.href = redirect
}
const handleWechatAuthBySign = (context, fn, url) => {
  if (Cookies.get('sign')) {
    context.sign = Cookies.get('sign')
    fn()
    return
  }
  let [code, state] = [context.$route.query.code, context.$route.query.state]
  if (code && state) {
    getUserData(code, state)
      .then(res => {
        context.sign = res.sign
        Cookies.set('sign', res.sign)
        fn()
      })
      .catch(err => {
        if (err.response.status === 401) handleWechatAuth(url)
      })
    return
  }
  handleWechatAuth(url)
}
const getUserData = (code, state) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GET_USER_DATA_URL, V2_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 当code state 过期时候需要处理
const NaviToWechatAuth = customUrl => {
  const appid = 'wx63bd0a98ca1b6251'
  const redirectUri = encodeURIComponent(customUrl || window.location.href)
  const state = 'openid'
  const url =
    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
    appid +
    '&redirectUri=' +
    redirectUri +
    '&response_type=code&scope=snsapi_base&state=' +
    state +
    '#wechat_redirect'
  window.location.href = url
}

const getUserInfoByCodeAndState = (code, state) => {
  // 0151.H5通行证-我的信息
  const requestUrl = `${process.env.VUE_APP_EXE_API}/h5/wxuserinfo/`
  const requestParams = {
    params: {
      code: code,
      state: state,
      api: 'json'
    }
  }
  return new Promise((resolve, reject) => {
    axios
      .get(requestUrl, requestParams)
      .then(r => {
        resolve(r)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export {
  getWxUserInfo,
  handleWechatAuth,
  handleWechatAuthBySign,
  NaviToWechatAuth,
  getUserInfoByCodeAndState,
  getUserData
}

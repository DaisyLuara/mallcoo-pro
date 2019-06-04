import axios from 'axios'
import { apiToken, Cookies } from '@/services'

const MALLCOO_API = process.env.VUE_APP_AD_API + '/api/mallcoo/user/oauth'
const MALLCOO_URL = process.env.VUE_APP_AD_API + '/api/mallcoo'
const REQ_HEADER = {
  headers: {
    'api-token': apiToken,
    'Set-Cookie': 'sign=' + Cookies.get('sign')
  }
}
const handleParma = params => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
  params.sign = Cookies.get('sign')
}

// 猫酷授权
const getMallcooOauth = params => {
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(MALLCOO_API, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//猫酷注册发券测试
//商场会员信息( 查询是否是商场会员)params={z,oid}
const checkMallMember = params => {
  return new Promise((resolve, reject) => {
    axios
      .get(MALLCOO_URL + '/user', { params })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

//发送短信验证码
const sendMessageCode = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(MALLCOO_URL + '/verificationCodes', params)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//手机号开卡接口
const openMallcooMemberByPhone = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(MALLCOO_URL + '/users', params)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 猫酷查询优惠券包
const getMallcooCouponInfo = params => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${MALLCOO_URL}/couponPacks`, { params })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 猫酷-领取优惠券包
const receiveMallcooCoupon = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(MALLCOO_URL + '/couponPacks', params, {
        headers: { 'api-token': apiToken }
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 猫酷-查询优惠券
const getMallcooUserCoupon = params => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        MALLCOO_URL + '/user/coupon',
        { params },
        {
          headers: { 'api-token': apiToken }
        }
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 猫酷-领取优惠券
const mallcooCoupons = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(MALLCOO_URL + '/coupons', params, {
        headers: { 'api-token': apiToken }
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export {
  getMallcooOauth,
  checkMallMember,
  sendMessageCode,
  openMallcooMemberByPhone,
  getMallcooCouponInfo,
  receiveMallcooCoupon,
  getMallcooUserCoupon,
  mallcooCoupons
}

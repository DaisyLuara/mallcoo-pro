import axios from 'axios'
import { apiToken, Cookies } from '@/services'

const COUPOUS_URL = process.env.VUE_APP_AD_API + '/api/open/coupons/'
const OPEN_COUPON = process.env.VUE_APP_AD_API + '/api/open/coupon/'
const OPEN_USER_COUPON = process.env.VUE_APP_AD_API + '/api/open/user/coupon'

const IMAGE_UPLOAD = process.env.VUE_APP_AD_API + '/api/images'

const MALLCOO_API = process.env.VUE_APP_AD_API + '/api/mallcoo/user/oauth'
const BATCH_URL = process.env.VUE_APP_AD_API + '/api/open/coupon/batches'
const PROJECTS_URL = process.env.VUE_APP_AD_API + '/api/open/projects/coupons'
const MALLCOO_URL = process.env.VUE_APP_AD_API + '/api/mallcoo'
const REQ_HEADER = {
  headers: {
    'api-token': apiToken,
    'Set-Cookie': 'sign=' + Cookies.get('sign')
  }
}
const V2_HEADER = {
  headers: {
    'api-token': apiToken,
    Accept: 'application/vdn.xingstation.v2+json'
  }
}
const handleParma = params => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
  params.sign = Cookies.get('sign')
}

// 根据积分获取券
const getAdCoupon = (params, id) => {
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(COUPOUS_URL + id, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 确认优惠券是否已经领完
const checkCouponNumber = couponId => {
  let params = {}
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(OPEN_COUPON + 'batches/' + couponId, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//  发优惠券
const sendCoupon = (params, couponId) => {
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(COUPOUS_URL + couponId, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 概率获取优惠券ID（coupinId）
const getCouponId = policyId => {
  let params = {}
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(OPEN_COUPON + 'batches?policy_id=' + policyId, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 获取券的信息（包括判断是否用手机号领过券）
const checkGetCoupon = params => {
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(OPEN_USER_COUPON, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 上传照片接口
const getImage = params => {
  params.append('sign', Cookies.get('sign'))
  if (Cookies.get('game_attribute_payload')) {
    params.append(
      'game_attribute_payload',
      Cookies.get('game_attribute_payload')
    )
  }
  return new Promise((resolve, reject) => {
    axios
      .post(IMAGE_UPLOAD, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export {
  getAdCoupon,
  checkCouponNumber,
  getCouponId,
  checkGetCoupon,
  sendCoupon,
  getImage
}

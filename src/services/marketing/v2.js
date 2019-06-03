// V2版本
import axios from 'axios'
import { apiToken } from '@/services'

const COUPOUS_URL = process.env.VUE_APP_AD_API + '/api/open/coupons/'
const OPEN_USER_COUPON = process.env.VUE_APP_AD_API + '/api/open/user/coupon'
const BATCH_URL = process.env.VUE_APP_AD_API + '/api/open/coupon/batches'
const PROJECTS_URL = process.env.VUE_APP_AD_API + '/api/open/projects/coupons'

const V2_HEADER = {
  headers: {
    'api-token': apiToken,
    Accept: 'application/vdn.xingstation.v2+json'
  }
}
// 获取券的信息（包括判断是否用手机号领过券）
const checkV2Coupon = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(OPEN_USER_COUPON, params, V2_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 发券V2版本
const sendV2Coupon = (params, couponId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(COUPOUS_URL + couponId + '?include=couponBatch', params, V2_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 多节目发券领券v2版本
const sendV2Projects = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(PROJECTS_URL + '?include=couponBatch', params, V2_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// BATCH_URL调取策略获取coupon_batch_id  id
const batchV2Coupon = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(BATCH_URL, params, V2_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// BATCH_URL调取策略获取coupon_batch_id  limit
const batchV2CouponLimit = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(BATCH_URL + '/limit', params, V2_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export {
  checkV2Coupon,
  sendV2Coupon,
  batchV2Coupon,
  sendV2Projects,
  batchV2CouponLimit
}

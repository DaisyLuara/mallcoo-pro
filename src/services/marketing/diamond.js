import axios from 'axios'
import { apiToken } from '@/services'
const QINIU_TOKEN_URL = process.env.VUE_APP_DIAMOND_API + '/qiniu_token'
const QINIU_UPLOAD_URL = 'http://upload.qiniu.com'
const UPLOAD_CALLBACK_URL = process.env.VUE_APP_DIAMOND_API + '/activity_media'
const PUSH_API = 'http://dev.xingstation.net/api/push/520/add'

// 建立请求拦截器
const fetchWithToken = axios.create({
  baseURL: process.env.DIAMOND_API
})
fetchWithToken.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['api-token'] = apiToken
    config.headers['Accept'] = 'application/vdn.xingstation.v3+json'
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)
fetchWithToken.interceptors.response.use(
  response => {
    const status = response.status
    if (status === 204) {
      return {
        code: 404
      }
    } else {
      return {
        code: 0,
        data: response.data
      }
    }
  },
  error => {
    console.log(error.response)
    if (error.response.status_code === 404) {
      return {
        code: 404
      }
    } else {
      return Promise.reject(error)
    }
  }
)

// 建立榜单请求拦截器
const diamondTopReq = axios.create({
  baseURL: process.env.VUE_APP_DIAMOND_TOP_API,
  withCredentials: process.env.NODE_ENV === 'production'
})
diamondTopReq.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)
diamondTopReq.interceptors.response.use(
  response => {
    return {
      code: 0,
      data: response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

// 获取上传图片需要的七牛token
const qiniuToken = () => {
  const headers = {
    'api-token': apiToken
  }
  return new Promise((resolve, reject) => {
    axios
      .get(QINIU_TOKEN_URL, {
        headers
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 上传图片至七牛
const uploadImgToQiniu = args => {
  return new Promise((resolve, reject) => {
    axios
      .post(QINIU_UPLOAD_URL, args)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 图片归档
const postActivityMedia = args => {
  const headers = {
    'api-token': apiToken
  }
  return new Promise((resolve, reject) => {
    axios
      .post(
        UPLOAD_CALLBACK_URL,
        {
          ...args,
          utm_campaign: 'Love520Action' // 活动标识
        },
        {
          headers
        }
      )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 发送用户的告白信息
const postLoveInfo = args => {
  return fetchWithToken({
    url: '/confessions',
    method: 'post',
    data: args
  })
}

// 查询用户的告白信息
const getLoveInfo = args => {
  return fetchWithToken({
    url: '/user/confession',
    params: args
  })
}

// 请求手机验证码
const getVerificationCodes = args => {
  return fetchWithToken({
    url: '/arMember/verificationCodes',
    method: 'post',
    data: args
  })
}

// 发送手机验证信息
const bindUserPhone = args => {
  return fetchWithToken({
    url: '/user',
    method: 'patch',
    data: args
  })
}

// 查询用户是否有优惠券
const queryUserCoupon = args => {
  return fetchWithToken({
    url: '/open/user/coupon?include=couponBatch',
    method: 'post',
    data: args
  })
}

// h5抽奖
const h5Batches = args => {
  return fetchWithToken({
    url: '/open/coupon/batches',
    method: 'get',
    params: args
  })
}

// 领取优惠券
const bindUserCoupon = args => {
  return fetchWithToken({
    url: '/open/coupons?include=couponBatch',
    method: 'post',
    data: args
  })
}

// 获取照片投票榜单
const getPhotoBoard = args => {
  return diamondTopReq({
    url: '/boards',
    params: args
  })
}

// 获取榜单照片详情
const getVoteDetail = id => {
  return diamondTopReq({
    url: `/boards/${id}`
  })
}

// 上榜
const addToBoard = args => {
  return diamondTopReq({
    url: '/board',
    method: 'post',
    data: args
  })
}

// 投票
const vote = args => {
  return diamondTopReq({
    url: '/vote',
    method: 'post',
    data: args
  })
}

// 获取个人榜单id
const getUserBoardId = args => {
  return diamondTopReq({
    url: '/user/board',
    method: 'post',
    data: args
  })
}

// 提取照片
const fetchPhotoByPhone = args => {
  return fetchWithToken({
    url: '/user/upload/confession',
    params: args
  })
}

// 推送照片到大屏
const pushPhoto = args => {
  return axios({
    url: PUSH_API,
    params: args
  })
}

export {
  qiniuToken,
  uploadImgToQiniu,
  postActivityMedia,
  postLoveInfo,
  getLoveInfo,
  getVerificationCodes,
  bindUserPhone,
  queryUserCoupon,
  h5Batches,
  bindUserCoupon,
  getPhotoBoard,
  getVoteDetail,
  addToBoard,
  vote,
  fetchPhotoByPhone,
  pushPhoto,
  getUserBoardId
}

import axios from 'axios'
import { apiToken, Cookies } from '@/services'
const GAME_URL = process.env.VUE_APP_SAAS_API + '/user/'
const GAME_LIST_URL = process.env.VUE_APP_SAAS_API + '/user/'
const REGISTER_URL = process.env.VUE_APP_AD_API + '/api/temp/customer'
const Accept = 'application/vnd.saas.v2+json'

const REQ_HEADER = {
  headers: {
    'api-token': apiToken,
    'Set-Cookie': 'sign=' + Cookies.get('sign')
  }
}
const V2_HEADER = {
  headers: {
    Accept: Accept
  }
}
const createGame = (params, userId) => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL + userId + '/game', params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const userGame = (params, userId) => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL + userId + '/game_attribute', params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getGame = (params, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GAME_LIST_URL + userId + '/games', params, REQ_HEADER)
      .then(response => {
        resolve(response.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 同一游戏不同场景
const getSceneData = (userId, url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GAME_LIST_URL + userId + '/games' + url, params)
      .then(response => {
        resolve(response.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 节目数据，根据场景scene和版本号belong筛选
const getProjectData = (userId, url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GAME_LIST_URL + userId + '/games' + url, V2_HEADER)
      .then(response => {
        resolve(response.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 保存临时用户信息
const userData = params => {
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .post(REGISTER_URL, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export { createGame, getGame, userGame, getSceneData, userData, getProjectData }

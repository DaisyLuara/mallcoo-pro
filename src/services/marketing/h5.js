// 斌伟的h5接口文档里面的  接口
import axios from 'axios'

const baseUrl = process.env.VUE_APP_EXE_API
const EXE_URL = 'http://xingstation.cn'
const NEW_LIST_NOCHECK = `${baseUrl}/h5/awardlist/?api=json`
const NEW_LIST_NEEDCHECK = `${baseUrl}/all/awardpass/?api=json`
const USER_HONOUR = `${baseUrl}/h5/userhonour/?cp=1&size=10&api=json`
const GAME_LIST = `${baseUrl}/all/actresult/?api=json`
const APPLICATION_COMMON = `${baseUrl}/all/actpi/?api=json`
const GAME_DATA_LIST = `${baseUrl}/h5/userprovn/?api=json`
const PROJECT_IMAGE_LIST = `${baseUrl}/h5/userphotovn/?cp=1&size=20&api=json`
const POST_URL = `${EXE_URL}:8010/pushdiv/?`
// 排行榜新接口 akey  http://xingstation.cn/client/h5/awardlist/?akey=2043162232&cp=1&size=100&api=json  不需要用户确定，自动排行
const newGameList = akey => {
  return new Promise((resolve, reject) => {
    axios
      .get(NEW_LIST_NOCHECK + '&akey=' + akey)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 排行榜新接口 awardinfo结构体中，pass==0或者valuetmp!=value的时候，则代表需要参与者点击确认 http://xingstation.cn/client/all/awardpass/?auid=442&z=4fk2d91686b0fcef93b6e594689846cb4631n5&api=json
const gameListNeedCheck = (auid, z) => {
  return new Promise((resolve, reject) => {
    axios
      .get(NEW_LIST_NEEDCHECK + '&auid=' + auid + '&z=' + z)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 联动，荣耀honour
// http://xingstation.cn/client/h5/userhonour/?cp=1&size=10&bid=0&z=4fk2d91686b0fcef93b6e594689846cb4631n5&api=json&document=truxish2114558de 联动，获取勋章
const getGameHonour = (bid, z) => {
  return new Promise((resolve, reject) => {
    axios
      .get(USER_HONOUR + '&bid=' + bid + '&z=' + z)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 获取排行榜所有结果158
// http://xingstation.cn/client/all/actresult/?awardkey=0t9021d1upt47350101gy14q&z=4fk2d91686b0fcef93b6e594689846cb4631n5&api=json
const getGameList = (awardkey, z) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GAME_LIST + '&awardkey=' + awardkey + '&z=' + z)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 活动报名169---通用版本;http://xingstation.cn/client/all/actpi/?avrid=4333&z=4fk2d91686b0fcef93b6e594689846cb4631n5&actid=16&api=json
// params = {
//   avrid: 4333,
//   z: '4fk2d91686b0fcef93b6e594689846cb4631n5',
//   actid: 16
// }
const toApplication = params => {
  return new Promise((resolve, reject) => {
    axios
      .get(APPLICATION_COMMON, { params: params })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 用户玩的次数，分版本  春暖花开
const getGamesNumberData = (pn, z) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GAME_DATA_LIST + '&pn=' + pn + '&z=' + z)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
const getProjectImages = (pn, z) => {
  return new Promise((resolve, reject) => {
    axios
      .get(PROJECT_IMAGE_LIST + '&pn=' + pn + '&z=' + z)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 向大屏推送数据
const handleDataPost = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(POST_URL + url)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export {
  newGameList,
  gameListNeedCheck,
  getGameHonour,
  getGameList,
  toApplication,
  getGamesNumberData,
  getProjectImages,
  handleDataPost
}

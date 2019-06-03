import axios from 'axios'
import { GetParamsFromUrl } from '@/services'

// 固定参数
const customTrack = {
  adId: 100,
  mobileRecords: process.env.VUE_APP_SAAS_API + '/open/track/mobileRecords',
  play_result_id: 0,
  laId: 100
}

// _paq发送手机号
const req = GetParamsFromUrl()
customTrack.adId = req.adId | undefined ? req.adId : 100
customTrack.laId = req.laId | undefined ? req.laId : 100
customTrack.play_result_id = req.recordId ? req.recordId : 0

// 基本的id和手机号追踪
const basicTrack = (id, phoneNumber) => {
  const baseUrl = process.env.VUE_APP_EXE_API
  let url =
    `${baseUrl}/goodsxsd/?id=` +
    String(id) +
    '&mobile=' +
    String(phoneNumber) +
    '&api=json'
  axios.get(url).then(() => {})
}
const wechatShareTrack = () => {

}
export { basicTrack, wechatShareTrack }

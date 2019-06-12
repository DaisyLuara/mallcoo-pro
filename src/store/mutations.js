import * as types from './mutation-types'
const mutations = {
  [types.SET_LOGIN_STATE](state, v) {
    state.loginState = v
  },
  [types.SET_LAST_BARRAGE_TIME](state, v) {
    state.lastBarrageTime = v
  },
  [types.SET_WX_JS_URL](state, url) {
    state.weixinUrl = url
  }
}

export default mutations

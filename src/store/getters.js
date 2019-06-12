const getters = {
  z: state => {
    return state.loginState.z
  },
  loginState: state => {
    return state.loginState
  },
  lastBarrageTime: state => {
    return state.lastBarrageTime
  },
  weixinUrl: state => {
    return state.weixinUrl
  },
  avatar: state => {
    return state.loginState.face
  },
  uid: state => {
    return state.loginState.uid
  }
}

export default getters

const devState = {
  loginState: {
    // z: '4al80b01d4c528dcd5eb9e094faf86f92cc25g',
    // z: '',
    // z: '8b96bc7fba4c1176b3fc0861e94f22465c0f6a',
    // z: 'ky71a2d5dfff925b026de99489f68fd8a29f1t',
    // z: 'p5qd7da707e816e83aa9c9c3ca5fd4edf4cgpv',
    z: 've6ef0b2a2ded2621d9258679daa405d63fv67',
    gender: '1',
    username: 'Wending',
    // mobile: '18817392917',
    face:
      'http://thirdwx.qlogo.cn/mmopen/vi_32/kPmo3eFGlBOPalDZHOpAicFPfQaicU7icJnypiaUxUcFEOE2kdddNsFXPkmiaeBo6LCRau0ibZK72fUtDpo9dSZccXTA/132'
  },
  lastBarrageTime: null,
  weixinUrl: ''
}
const productionState = {
  loginState: {
    z: ''
  },
  lastBarrageTime: null,
  weixinUrl: ''
}

let state = process.env.NODE_ENV === 'development' ? devState : productionState

export default state

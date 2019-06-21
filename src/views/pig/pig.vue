<template>
  <div class="warp">
    <div
      v-if="photo"
      class="pig"
    >
      <img
        :src="pig +'bg.png'"
        class="bg"
      >
      <img
        :src="photo"
        class="photo"
      >
    </div>
    <div
      v-show="register"
      class="mask"
    >
      <div
        v-show="!doc"
        class="form"
      >
        <img
          :src="base + 'pigbg.png'"
          class="bg"
        >
        <input
          id="phone"
          v-model="phone"
          type="text"
          maxlength="11"
          class="phone"
          @change="checkPhone"
        >
        <input
          id="vertify"
          v-model="vcode"
          type="text"
          maxlength="4"
          class="vertify"
        >
        <div
          class="vertify-text"
          @click="onGetVcode"
        >
          {{ vcodeText }}
        </div>
        <a
          class="confirm"
          @click="doRegister"
        >
        </a>
      </div>
      <div
        v-show="doc"
        class="word-register"
      >
        <div class="word">
          <img
            :src="base + 'docbg.png'"
            class="bg"
          >
          <a
            class="xingstation-url"
            @click="getLookDocXing"
          ></a>
          <a
            :href="huiju_doc"
            class="huiju-url"
          ></a>
          <a
            class="confirm-doc"
            @click="confirmDoc(true)"
          ></a>
          <a
            class="refuse"
            @click="confirmDoc(false)"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  isInWechat,
  getInfoById,
  checkMallMember,
  sendMessageCode,
  openMallcooMemberByPhone,
  validatePhone,
  splitParms,
  handleWechatAuthBySign,
  parseService
} from 'services'
const CDNURL = process.env.VUE_APP_CDN_URL
const PARSEURL = process.env.VUE_APP_PARSE_SERVER + '/parse/classes/'
export default {
  data() {
    return {
      base: CDNURL + '/fe/image/kaika/',
      pig: CDNURL + '/fe/image/yun/',
      oid: null,
      belong: null,
      sign: '',
      isMember: false, // false
      register: false, // false
      doc: true,
      phone: '',
      photo: null,
      params: null,
      vcode: '',
      time: 60,
      vcodeText: '点击获取',
      verification_key: '',
      huiju_doc: 'http://papi.xingstation.com/api/s/ymw'
    }
  },
  mounted() {
    // 微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuthBySign()
      }
    }
  },
  methods: {
    async init() {
      try {
        let { id, code, state } = this.$route.query
        let { belong, oid, image, parms } = await getInfoById(id, code, state)
        this.oid = oid
        this.belong = belong
        this.photo = image
        this.params = splitParms(parms)
        const getMallcooUserArgs = {
          sign: this.sign,
          oid: this.oid
        }
        const getMallcooUserResult = await checkMallMember(getMallcooUserArgs)
        getMallcooUserResult
          ? this.isMember = true : this.register = true
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message)
        }
      }
    },
    // 微信静默授权
    handleWechatAuthBySign() {
      handleWechatAuthBySign(this, this.init, window.location.href)
    },
    checkPhone() {
      if (!this.phone || !validatePhone(this.phone)) {
        alert('手机格式不正确，请重新输入')
      }
    },
    onCountDown() {
      let timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(timer)
          this.vcodeText = '点击获取'
          this.time = 60
        } else {
          this.vcodeText = this.time + 's后重发'
          this.time--
        }
      }, 1000)
    },
    onGetVcode() {
      if (this.vcodeText !== '点击获取') {
        return
      }
      if (!this.phone) {
        alert('请输入手机号码')
        return
      }
      if (!validatePhone(this.phone)) {
        alert('手机格式不正确，请重新输入')
        return
      }
      this.onCountDown()
      let params = {
        type: 'huiju',
        phone: this.phone
      }
      sendMessageCode(params)
        .then(res => {
          this.verification_key = res.key
        })
        .catch(err => {
          alert(err.response.data.message)
          this.vcodeText = '点击获取'
        })
    },
    doRegister() {
      if (!this.phone) {
        alert('请输入手机号码')
        return
      }
      if (!validatePhone(this.phone)) {
        alert('手机格式不正确，请重新输入')
        return
      }
      if (!this.vcode) {
        alert('请输入验证码')
        return
      }
      let params = {
        verification_key: this.verification_key,
        verification_code: this.vcode,
        oid: this.oid,
        sign: this.sign,
        qiniu_id: this.$route.query.id
      }
      openMallcooMemberByPhone(params)
        .then(res => {
          this.isMember = true
          this.register = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    getLookDocXing() {
      this.$router.push({
        path: 'pig_word'
      })
    },
    confirmDoc(confirm) {
      this.doc = false
      this.saveAgreeData(confirm)
    },
    saveAgreeData(confirm) {
      let parms = {
        qiniu_id: this.$route.query.id,
        createTime: new Date().getTime(),
        sign: this.sign,
        belong: this.belong,
        agreement: confirm,
        agree: confirm ? '已同意' : '拒绝'

      }
      parseService
        .post(PARSEURL + 'pig_kaika', parms)
        .then(res => {
          console.log('保存成功')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@img: "https://cdn.xingstation.cn/fe/image/kaika/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  max-width: 100%;
}
.bg {
  position: relative;
  z-index: 0;
}
a {
  display: inline-block;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.warp {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
  background-color: #ffde1d;
  .pig {
    width: 100%;
    position: relative;
    z-index: 0;
    overflow: hidden;
    .bg {
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 57.5%;
      position: absolute;
      top: 32.6%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
      z-index: 999;
    }
  }
  .mask {
    width: 100vw;
    // height: 100vh;
    height: 100%;
    position: absolute;
    top: 0%;
    bottom: 0%;
    left: 0%;
    right: 0%;
    overflow: hidden;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.7);
    .form {
      width: 75%;
      position: relative;
      z-index: 0;
      margin-top: 25%;
      input {
        background: transparent;
        .center;
        height: 8.5vw;
        line-height: 8vw;
        text-align: left;
        color: #956d5b;
        font-size: 14px;
        z-index: 99;
      }
      .phone {
        position: absolute;
        top: 30%;
        left: 60%;
        width: 40%;
      }
      .vertify {
        position: absolute;
        left: 46%;
        top: 43.5%;
        width: 22%;
      }
      .vertify-text {
        position: absolute;
        right: 14%;
        top: 45%;
        width: 17%;
        height: 5.5vw;
        line-height: 5.5vw;
        text-align: center;
        color: #956d5b;
        font-size: 10px;
        z-index: 99;
      }
      .confirm {
        width: 56%;
        height: 11vw;
        .center;
        bottom: 7.5%;
        z-index: 99;
      }
    }
    .word-register {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0%;
      left: 0%;
      z-index: 99;
      .word {
        width: 85.5%;
        position: relative;
        z-index: 0;
        margin-top: 20%;
      }
      a {
        display: inline-block;
        position: absolute;
        z-index: 99;
      }
      .xingstation-url {
        width: 33vw;
        height: 4vw;
        top: 46%;
        left: 4%;
      }
      .huiju-url {
        width: 37vw;
        height: 4vw;
        top: 46%;
        right: 11%;
      }
      .confirm-doc {
        width: 80vw;
        height: 11vw;
        top: 72%;
        left: 3%;
      }
      .refuse {
        width: 12vw;
        height: 12vw;
        bottom: 0%;
        left: 44%;
      }
    }
  }
}
</style>

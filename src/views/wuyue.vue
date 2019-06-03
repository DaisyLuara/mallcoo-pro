<template>
  <div class="warp">
    <div
      v-show="!index"
      class="title"
    >
      <img :src="base + 'title.png'">
    </div>
    <!-- 领取页 -->
    <div
      v-if="index"
      class="index-div"
    >
      <div class="title">
        <img :src="base + 'title.png'">
      </div>
      <div class="get-click">
        <img
          :src="base + 'couponbg.png'"
          class="bg"
        >
        <a
          class="couponBtn"
          @click="onClickReceiveBtn"
        >
          <img :src="base + 'click.png'">
        </a>
      </div>
      <div class="div-picture">
        <div class="picture">
          <img
            :src="base + '1.png'"
            class="bg"
          >
          <img
            :src="photo"
            class="photo"
          >
        </div>
        <img
          :src="base + 'save.png'"
          class="save"
        >
      </div>
      <div class="logo">
        <img :src="base + 'logo.png'">
      </div>
    </div>
    <!-- 注册页 -->
    <div
      v-if="register&&!index"
      class="register-div"
    >
      <div class="div-form">
        <div class="div-phone">
          <img
            :src="base + 'phone.png'"
            class="bg"
          >
          <input
            v-model="phone"
            type="text"
            maxlength="11"
            placeholder="请输入手机号"
            class="mobile"
            @change="checkPhone"
          >
        </div>
        <div class="div-vertify">
          <img
            :src="base + 'valid.png'"
            class="bg"
          >
          <input
            v-model="vcode"
            type="text"
            maxlength="4"
            placeholder="验证码"
            class="vcode"
          >
          <div
            v-if="!disabled"
            class="div-vertifybtn"
          >
            <a
              class="getvalid"
              @click="onGetVcode"
            >
              <img :src="base + 'getvalid2.png'">
            </a>
          </div>
          <div
            v-else
            class="div-vertifybtn"
          >
            <img
              :src="base + 'vbg.png'"
              class="bg"
            >
            <div class="vcode-text">
              {{ vcodeText }}
            </div>
          </div>
        </div>
      </div>
      <a
        class="register-btn"
        @click="doRegister"
      >
        <img :src="base + 'confirm.png'">
      </a>
    </div>
    <!-- 券列表 -->
    <div
      v-if="couponList&&!index"
      class="coupon-list"
      @click="gotoLink"
    >
      <img
        :src="base + 'list.png'"
        class="list"
      >
      <img
        :src="base + 'tip.png'"
        class="tip"
      >
    </div>
    <div
      v-show="loading"
      class="loading"
    >
      <img
        :src="base + '0.png'"
        class="circle"
      >
      <img
        :src="base + 'bg4.png'"
        class="bg"
      >
    </div>
    <div
      v-show="!index"
      class="logo-div"
    >
      <img :src="base + 'logo.png'">
    </div>
  </div>
</template>
<script>
import {
  Cookies,
  $wechat,
  isInWechat,
  wechatShareTrack,
  getInfoById,
  getMallcooCouponInfo,
  checkMallMember,
  receiveMallcooCoupon,
  sendMessageCode,
  openMallcooMemberByPhone,
  validatePhone
} from "@/services";
import { onlyWechatShare } from "@/mixins/onlyWechatShare";
const CDNURL = process.env.VUE_APP_CDN_URL
export default {
  mixins: [onlyWechatShare],
  data () {
    return {
      CDNURL: CDNURL,
      base: CDNURL + "/fe/image/wuyueGold/",
      sign: "",
      qiniu_id: this.$route.query.id,
      photo: null,
      index: true,//true
      couponList: false,//false
      register: true,//true
      disabled: false,//false
      loading: false,//false
      phone: "",
      vcode: "",
      time: 60,
      vcodeText: "60s后重发",
      verification_key: "",
      wxShareInfoValue: {
        title: "免费领“吃喝购”优惠礼包",
        desc: "还有额外小惊喜可领，先到先得",
        link: process.env.M_URL + '/marketing/wys_share' + window.location.search,
        imgUrl: CDNURL + "/fe/image/wuyueGold/icon.png"
      }
    }
  },
  mounted () {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    async init () {
      try {
        let { id, code, state } = this.$route.query
        let { belong, oid, image } = await getInfoById(id, code, state)
        this.oid = oid
        this.belong = belong
        this.photo = image
        const getCouponListArgs = {
          sign: this.sign,
          qiniu_id: this.qiniu_id,
          oid: this.oid,
          belong: this.belong
        }
        const getMallcooUserArgs = {
          sign: this.sign,
          oid: this.oid
        }
        const getCouponListResult = await getMallcooCouponInfo(getCouponListArgs)
        if (getCouponListResult) {
          this.couponList = true
          this.register = false
          this.index = false
          return
        }
        const getMallcooUserResult = await checkMallMember(getMallcooUserArgs)
        if (getMallcooUserResult) {
          this.register = false
          this.sendMallcooCoupon()
        }

      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        }
      }
    },
    //微信静默授权
    handleWechatAuth () {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.sign = Cookies.get('sign')
        this.init()
      }
    },
    onClickReceiveBtn () {
      this.index = false
    },
    checkPhone () {
      if (!this.phone || !validatePhone(this.phone)) {
        alert("手机格式不正确，请重新输入");
      }
    },
    sendMallcooCoupon () {
      const sendCouponArgs = {
        qiniu_id: this.qiniu_id,
        sign: this.sign,
        belong: this.belong,
        oid: this.oid
      }
      receiveMallcooCoupon(sendCouponArgs).then(res => {
        res ? this.couponList = true : null
      }).catch(err => {
        // alert(err.response.data.message);
      })
    },
    onCountDown () {
      let timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(timer);
          this.disabled = false
          this.vcodeText = "60s后重发";
          this.time = 60;
        } else {
          this.vcodeText = this.time + 's后重发';
          this.time--;
        }
      }, 1000);
    },
    onGetVcode () {
      if (!this.phone) {
        alert("请输入手机号码");
        return;
      }
      if (!validatePhone(this.phone)) {
        alert("手机格式不正确，请重新输入");
        return;
      }
      this.disabled = true
      this.onCountDown();
      let params = {
        phone: this.phone
      };
      sendMessageCode(params)
        .then(res => {
          this.verification_key = res.key;
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    doRegister () {
      if (!this.phone) {
        alert("请输入手机号码");
        return;
      }
      if (!validatePhone(this.phone)) {
        alert("手机格式不正确，请重新输入");
        return;
      }
      if (!this.vcode) {
        alert("请输入验证码");
        return;
      }
      let params = {
        verification_key: this.verification_key,
        verification_code: this.vcode,
        oid: this.oid,
        sign: this.sign
      };
      openMallcooMemberByPhone(params)
        .then(res => {
          this.register = false
          this.sendMallcooCoupon();
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    gotoLink () {
      this.couponList = false
      this.loading = true
      window.location.href = 'https://m.mallcoo.cn/a/coupon/10658'
    }
  }
}
</script>
<style lang="less" scoped>
@img: "https://cdn.xingstation.cn/fe/image/wuyueGold/";
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
.warp {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
  background-color: #170632;
  background-image: url("@{img}bg.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .title {
    width: 71.76%;
    position: relative;
    z-index: 0;
    margin-top: 10%;
    margin-bottom: 2%;
  }
  .index-div {
    width: 100%;
    min-height: 100vh;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 0;
    .get-click {
      width: 57.41%;
      position: relative;
      z-index: 0;
      margin-bottom: 9%;
      .couponBtn {
        width: 77.23%;
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99;
      }
    }
    .div-picture {
      width: 100%;
      position: relative;
      padding-right: 15%;
      .picture {
        width: 50%;
        position: relative;
        z-index: 0;
        .photo {
          width: 89%;
          position: absolute;
          top: 49%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 99;
          pointer-events: auto;
          user-select: auto;
        }
      }
      .save {
        position: absolute;
        top: 1%;
        right: 22%;
        z-index: 99;
        width: 10.65%;
      }
    }
  }
  .register-div {
    width: 64.26%;
    position: relative;
    background-image: url("@{img}kuang.png");
    background-position: center top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    padding-top: 30%;
    padding-bottom: 15%;
    .div-form {
      width: 80%;
      position: relative;
      & > div {
        margin-bottom: 8%;
        position: relative;
        overflow: hidden;
      }
      input {
        height: 100%;
        position: absolute;
        top: 0%;
        left: 34%;
        background: transparent;
        color: #fff;
        font-size: 3vw;
        text-align: left;
        z-index: 99;
      }
      .mobile {
        width: 55%;
      }
      .vcode {
        width: 25%;
      }
      .div-vertifybtn {
        width: 35%;
        position: absolute;
        top: 50%;
        right: 5%;
        transform: translateY(-50%);
        .vcode-text {
          width: 100%;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          opacity: 0.6;
          font-size: 3vw;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 99;
        }
      }
    }
    .register-btn {
      width: 73.8%;
      position: relative;
      margin-top: 8%;
    }
  }
  .coupon-list {
    position: relative;
    width: 100%;
    margin-bottom: 25%;
    .list {
      width: 88.7%;
      position: relative;
      margin-top: 3%;
    }
    .tip {
      width: 57%;
      position: relative;
      margin-top: 15%;
    }
  }
  .loading {
    width: 64.3%;
    position: relative;
    margin-top: 15%;
    .circle {
      position: absolute;
      width: 36.6%;
      top: 12%;
      left: 50%;
      z-index: 99;
      animation: circle 1s linear infinite;
    }
  }
  .logo {
    position: relative;
    width: 58%;
    margin-top: 8%;
    margin-bottom: 5%;
  }
  .logo-div {
    position: absolute;
    width: 58%;
    left: 50%;
    bottom: 3%;
    transform: translateX(-50%);
  }
}
@keyframes circle {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}
</style>



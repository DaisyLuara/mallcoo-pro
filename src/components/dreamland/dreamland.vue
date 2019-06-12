<template>
  <div
    :style="bgData"
    class="warp"
  >
    <Loading @click="loadingClick" />
    <slot></slot>
    <MergeImage />
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies, getInfoById } from 'services'
import Loading from './loading'
import MergeImage from './mergeImage'
const cdnUrl = process.env.VUE_APP_CDN_URL
export default {
  components: {
    Loading,
    MergeImage
  },
  mixins: [onlyWechatShare],
  props: {
    loadingType: {
      type: String,
      default: 'later'
    },
    shareData: {
      type: Object
    },
    bgData: {
      type: String,
      required: false,
      default:
        'background-image: url("' +
        cdnUrl +
        '/fe/marketing/img/dreamland/bg.png");'
    }
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    if (this.loadingType === 'later') {

    }
  },
  methods: {
    loadingClick () {
      if (this.loadingType !== 'click') {
        return
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/dreamland/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0 auto;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.warp {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
</style>

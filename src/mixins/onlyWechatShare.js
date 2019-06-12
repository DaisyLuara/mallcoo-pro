import { $wechat, isInWechat } from 'services'
const cdnUrl = process.env.VUE_APP_CDN_URL
export const onlyWechatShare = {
  data() {
    return {
      baseUrl: cdnUrl,
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '',
        imgUrl: ''
      }
    }
  },
  mounted() {
    this.handleWechatShare()
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      } else {
        console.warn('you r not in wechat environment')
      }
    }
  }
}

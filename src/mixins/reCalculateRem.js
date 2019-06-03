export const reCalculateRem = {
  data() {
    return {
      screenWidth: document.body.clientWidth
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        setTimeout(() => {
          this.calculateRem()
          this.timer = false
        }, 400)
      }
    }
  },
  mounted() {
    this.handleInit()
  },
  destroyed() {
    let html = document.getElementsByTagName('html')[0]
    html.removeAttribute('style')
  },
  methods: {
    handleInit() {
      this.calculateRem()
      window.onresize = () => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      }
    },
    calculateRem() {
      let html = document.getElementsByTagName('html')[0]
      let fontSize = (this.screenWidth / 375) * 100
      html.setAttribute('style', 'font-size: ' + fontSize + 'px')
    }
  }
}

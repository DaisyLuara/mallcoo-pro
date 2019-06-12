<template>
  <!-- 遮罩 -->
  <div class="shade">
    <img
      :src="baseUrl + 'hua.png' + this.$qiniuCompress()"
      class="hua"
    />
    <img
      :src="baseUrl + 'tip.png' + this.$qiniuCompress()"
      class="tip"
    />
  </div>
</template>
<script>
const cdnUrl = process.env.VUE_APP_CDN_URL
export default {
  data () {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/dreamland/'
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/dreamland/";
.shade {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}bg2.png");
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  .hua {
    width: 100%;
    animation: scale 1.5s linear infinite alternate;
  }
  .tip {
    width: 50%;
    position: absolute;
    left: 20%;
    top: 0%;
    animation: scale 1.5s linear infinite alternate;
  }
}
@keyframes scale {
  from {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.05, 1.05);
  }
  to {
    transform: scale(1, 1);
  }
}
</style>

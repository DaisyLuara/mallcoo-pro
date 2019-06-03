<template>
  <div>
    <DreamLand
      :paths="paths"
      :share-data="share"
    />
  </div>
</template>
<script>
import DreamLand from '@/components/DreamLand'
export default {
  components: {
    DreamLand
  },
  data () {
    return {
      paths: [
        {
          scope: 6,
          paths: ['wc_1.png', 'wc_2.png', 'wc_3.png', 'wc_4.png', 'wc_5.png']
        },
        {
          scope: 12,
          paths: ['mc_1.png', 'mc_2.png', 'mc_3.png', 'mc_4.png', 'mc_5.png']
        }
      ],
      share: {
        link: 'http://papi.xingstation.com/api/s/A11' + window.location.search
      }
    }
  }
}
</script>

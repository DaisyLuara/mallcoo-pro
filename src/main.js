import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import axios from 'axios'
import '@/services/utils/helper'
import './registerServiceWorker'
import store from './store'

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

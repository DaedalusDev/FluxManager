// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'vue-d3-network/dist/vue-d3-network.css'
import store from './store'
import ApplicationConst from './data/const'
import CoreComponents from './CoreComponents'
import './assets/main.css'

Vue.use(CoreComponents)

Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

Vue.use(ApplicationConst)

/* eslint-disable no-new */
window.Vue = Vue
window.vueInstance = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

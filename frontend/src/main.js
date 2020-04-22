import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from "./routes"
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import {initWebSocket} from './websocket'

initWebSocket()

Vue.config.productionTip = false
Vue.filter('kb', val => {
  return Math.floor(val / 1024)
})

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.addStatusHandler(status => {
    if (status === 'prepare')
      console.log('hot reloading')
    else if (status === 'idle')
      console.log('hot reload complete')
  })
}
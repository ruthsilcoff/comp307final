import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from "./routes";
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
//import '@fortawesome/fontawesome-free/css/all.css'
//import EXIF from 'exif-js'

Vue.config.productionTip = false

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
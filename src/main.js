import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'cesium/Widgets/widgets.css'
import * as Cesium from 'cesium/Cesium.js'

Vue.config.productionTip = false

Object.assign(Vue.prototype, {
  $Cesium: Cesium,
  test: Cesium
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

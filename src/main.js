import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'cesium/Widgets/widgets.css'
import * as Cesium from 'cesium/Cesium.js'
import getMap from './getMap.js'
import common from './common.js'

Vue.config.productionTip = false

Object.assign(Vue.prototype, {
  $Cesium: Cesium,
  $getMap: getMap,
  $common: common
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

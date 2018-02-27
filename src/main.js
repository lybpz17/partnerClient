// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AMap from 'vue-amap';

Vue.config.productionTip = false
Vue.use(ElementUI)

AMap.initAMapApiLoader({
  key: '973ff4275eaf1fb1ba1292a967ba116b'
});
Vue.use(AMap);

/* eslint-disable no-new */
// new Vue({
// 	el: '#app',
// 	router,
// 	render: h => h(App)
// })

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

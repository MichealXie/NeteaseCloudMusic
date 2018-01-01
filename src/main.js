// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {store} from './store/store'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  loading:'http://img.zcool.cn/community/01df4b59a7c1aaa801211d25b11d9b.gif',
  error:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC69yZoF-Kmt8lTCX6cqRWlgKPrg0B5j-GkD2z0jq8HugLQIptLw'
})


Vue.config.productionTip = false
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, 
  template: '<App/>',
  components: { App }
})

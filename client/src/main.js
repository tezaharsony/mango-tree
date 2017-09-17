// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import Firebase from 'firebase'

var config = {
  databaseURL: 'https://mangootree-fa54b.firebaseio.com',
  projectId: 'mangootree-fa54b'
}

Vue.prototype.$db = Firebase.initializeApp(config).database().ref('mango')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

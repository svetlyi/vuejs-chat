import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import extend from './rules'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.config.devtools = true;
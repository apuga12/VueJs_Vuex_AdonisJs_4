import Vue from 'vue'
//import App from './App.vue'  // Se hizo alias del . en webpack.config.js
import App from '@/App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

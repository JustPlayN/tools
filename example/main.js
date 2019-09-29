import Vue from 'vue'
import App from './app.vue'
import '../dist/wxBridge'
new Vue({
  el: '#app',
  render: h => h(App)
})

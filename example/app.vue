<template>
  <div class="example">
    <div>isIos: {{ios}}</div>
    <div>isApp: {{app}}</div>
    <div>isAlipay: {{app}}</div>
    <div @click="testThrottle">accMul: {{number}}</div>
  </div>
</template>

<script>
import ypTools from '../dist/index'
export default {
  data () {
    return {
      ios: ypTools.isIos(),
      app: ypTools.isApp(),
      number: ypTools.accMul(1.2, 1.2)
    }
  },
  methods: {
    testThrottle: ypTools.throttle(function () {
      this.mylog()
    }),
    mylog () {
      console.log(this)
    }
  },
  created () {
    console.log(ypTools.getUrlParam('id'))
  }
}
</script>

<style scoped>
</style>

<template>
  <div class="example">
    <div>isIos: {{ios}}</div>
    <div>isApp: {{app}}</div>
    <div>isAlipay: {{app}}</div>
    <div @click="testThrottle">accMul: {{number}}</div>
    <div @click="testShare">test share</div>
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
    },
    testShare () {
      const args = {
        title: '黄花菜凉了',
        desc: '这是描述',
        imgUrl: 'https://test-oss.ypshengxian.com/images/marketing/zr9Z7pLmw5.png',
        shareUrl: 'https://baidu.com',
        type: 1,
      }
      ypTools.apiRouter('goshare', args)
    }
  },
  created () {
    console.log(ypTools.getUrlParam('id'))
  }
}
</script>

<style scoped>
</style>

import { loadJs } from '../utils/utils'


if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
  loadJs('https://res.wx.qq.com/open/js/jweixin-1.3.2.js')
}

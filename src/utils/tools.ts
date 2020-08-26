/**
 * 函数列表
 * @accMul
 * @accDiv
 * @countDown
 * @img
 * @throttle
 * @debounce
 */

import * as utils from './utils'

/**
 * @function 小数乘法
 * @value 乘数
 * @multiplier 被乘数，默认100
 */
export const accMul = (value: number = 0, multiplier: number = 100): Number => {
  let m = 0
  let s1 = String(value)
  let s2 = String(multiplier)
  try {
    m += s1.split('.')[1].length
  } catch (e) {
    console.log(e)
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
    console.log(e)
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

/**
 * @function 除法函数，用来得到精确的除法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accDiv(arg1,arg2)
 * 返回值：val除以 div的精确结果
 */
export const accDiv = (val: number = 0, div: number = 100) => {
  let divsion = div || 100
  let value = val || 0
  let t1 = 0
  let t2 = 0
  let s1 = String(value)
  let s2 = String(divsion)
  if (/\./.test(s1)) {
    t1 = s1.split('.')[1].length
  }
  if (/\./.test(s2)) {
    t2 = s2.split('.')[1].length
  }
  return (Number(s1.replace('.', '')) / Number(s2.replace('.', ''))) * Math.pow(10, t2 - t1)
}

/**
 * @function 倒计时器
 * @param endTime：结束时间
 * @param timer：保存定时器的变量
 * @param showDay：定时器的输出格式
 */
export const countDown = (endTime: number, timer: any, callBack: Function, showDay: boolean = true) => {
  if (!endTime) {
    return
  }
  if (timer) {
    clearInterval(timer)
  }
  let countdown = 0
  let d = 0
  let h: any = 0
  let m: any = 0
  let s: any = 0
  timer = setInterval(() => {
    countdown = endTime - new Date().getTime()
    if (countdown > 0) {
      d = showDay ? Math.floor(countdown / 86400000) : 0
      h = Math.floor((countdown - d * 86400000) / 3600000)
      m = Math.floor((countdown - d * 86400000 - h * 3600000) / 60000)
      s = Math.floor((countdown - d * 86400000 - h * 3600000 - m * 60000) / 1000)
      h = h < 10 ? `0${h}` : h
      m = m < 10 ? `0${m}` : m
      s = s < 10 ? `0${s}` : s
      if (showDay) {
        callBack({ timer: timer, end: false, timeObj: { d, h, m, s } })
      }
    } else {
      callBack({ timer: null, end: true, timeObj: { d: 0, h: '00', m: '00', s: '00' } })
      clearInterval(timer)
    }
  }, 1000)
}

/**
 * @function 图片格式化过滤器
 * @param url：图片链接
 * @param w：图片width
 * @param h：图片height
 * @param m：图片裁切模式
 * 阿里云文档链接：https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.1324.25e13168TRuHyf
 * 腾讯云文档链接：https://cloud.tencent.com/document/product/460/6929
 */
export const img = (url: string, w: number, h: number, m: string = 'fill', tm = 2) => {
  const urlReg = /ss1\.ypshengxian\.com/
  const turlReg = /(test-oss)|(resources)\.ypshengxian\.com/
  const imgReg = /https?:/
  if (!imgReg.test(url)) {
    url = 'https://ss1.ypshengxian.com/minypdj/ypdft.jpg'
  }
  if (urlReg.test(url)) {
    const str = url.match(/(\S*)\?/) ? url.match(/(\S*)\?/)[1] : url
    const width = w ? `,w_${w}` : ''
    const height = h ? `,h_${h}` : ''
    const mode = w && h ? `,m_${m}` : ''
    return `${str}?x-oss-process=image/resize${mode}${height}${width}`
  } else if (turlReg.test(url)) {
    const str = url.match(/(\S*)\?/) ? url.match(/(\S*)\?/)[1] : url
    const width = w ? `/w/${w}` : ''
    const height = h ? `/h/${h}` : ''
    return `${str}?style=imageView2/${tm}${width}${height}/q/100`
  } else {
    return url
  }
}

/**
 * 节流
 * @param func 回掉函数
 * @param wait 执行func的间隔
 * @param options {leading: Boolean是否禁用第一次执行,trailing: Boolean停止后是否还触发一次回掉}
 */
export const throttle = (func: Function, wait: number = 600, options: any): Function => {
  let timeout = null, context = null, args = null
  let previous = 0
  if (!options) options = {
    trailing: false
  }
  let later = function() {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  let throttled: any = function () {
    let now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }
  // 取消执行
  throttled.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return throttled
}
/**
 * 防抖
 * @param func 回掉函数
 * @param wait 锁定时间，默认600ms
 * @param immediate 第一次是否立即执行，默认true
 */
export const debounce = (func: Function, wait: number = 600, immediate: boolean = true) => {
	let timeout = null, result = null

	let debounced: any = function () {
		let context = this
		let args = arguments

		if (timeout) clearTimeout(timeout)
		if (immediate) {
			// 如果已经执行过，不再执行
			let callNow = !timeout
			timeout = setTimeout(function () {
				timeout = null
			}, wait)
			if (callNow) result = func.apply(context, args)
		}
		else {
			timeout = setTimeout(function () {
				func.apply(context, args)
			}, wait)
		}

		return result
	};

	debounced.cancel = function () {
		clearTimeout(timeout)
		timeout = null
	}

	return debounced
}

/**
 * 1、解决移动端滚动穿透；
 * 2、解决ios11弹出层的input框光标偏移问题
 * open: 弹窗弹出的时候调用
 * close：弹窗关闭的时候调用
 * @returns {{open: open, close: close}}
 * @constructor
 */
export const ModalHelper = () => {
  let scrollTop
  return {
    open: function () {
      // 安卓和ios支持document.body.scrollTop返回正确数值, 但是document.documentElement.scrollTop返回0，谷歌浏览器却是相反的，
      // 总之，这两个值肯定会一个是0，另一个是正确的数值，为了我们日常在PC端和移动端能够正常调试和显示，这里进行相加。
      scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      document.body.classList.add('hack-scroll')
      document.body.style.top = -scrollTop + 'px'
    },
    close: function () {
      document.body.classList.remove('hack-scroll')
      document.body.scrollTop = scrollTop
      document.documentElement.scrollTop = scrollTop
    }
  }
}

/**
 * @function app是否需要更新
 * @param obj: {iosV: '', andriodV: ''}
 * @returns false: 不需要更新，true: 更新
 */
export const forceUpdate = function (obj: any):boolean {
  if (!utils.isApp()) {
    return false
  }
  let v = getAppVersion()
  let res: number
  if (utils.isIos()) {
    res = compareVersion(v, obj.iosV)
  } else {
    res = compareVersion(v, obj.androidV)
  }
  return res === -1
}

/**
 * 获取客户端版本号
 * @returns String
 */
export const getAppVersion = function ():string {
  return window.navigator.userAgent.match(/ypsx\/(ios|android)\/(\S*)/)[2] || '0.0.0'
}

/**
 * @function 比较版本号
 * @returns 0：v1 === v2
 * @returns 1：v1 > v2
 * @returns -1：v1 < v2
 */
export const compareVersion = function (v1, v2): number {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

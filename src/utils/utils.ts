/**
 * 函数列表
 * @isMiniProgram
 * @isApp
 * @isIos
 * @getCookie
 * @setCookie
 * @getUid
 * @loadJs
 * @getUrlParam
 */

declare var window: Wind

export const isMiniProgram = (): boolean => {
  if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1) {
    return false
  } else {
    window.wx.miniProgram.getEnv((res) => {
      if (!res.miniprogram) {
        return false
      } else {
        return true
      }
    })
  }
}
export const isApp = (): boolean => {
  return !!window.navigator.userAgent.match('LEFIT')
}
export const isIos = (): boolean => {
  return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/**
 * @function 获取通过name获得Cookie
 */
export const getCookie = (name: string): string => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}
/**
 * @function 获取通过name获得Cookie
 */
export const setCookie = (cName: string, value: any, maxAge: number): void => {
  document.cookie = cName + '=' + escape(value) + ((maxAge === null) ? '' : ';max-age=' + maxAge)
}

/**
 * @function 获取uid
 */
export const getUid = (): string => {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r&0x3|0x8)
    return v.toString(16)
  })
}

/**
 * @function 动态加载js
 * @param src 
 */
export const loadJs = (src: string) => {
  var script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.src = src
  document.body.appendChild(script)
  script.onload = function () {
    return true
  }
}

/**
 * @function 获取url的参数名称
 * @param name 获取的参数名称
 */
export const getUrlParam = function (name: string, url: string) {
  const search = url || decodeURIComponent(window.location.search)
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  const r = search.substr(1).match(reg) // 匹配目标参数
  if (r != null) {
    return unescape(r[2])
  } else {
    return null // 返回参数值
  }
}

interface Wind extends Window {
  wx: any
}

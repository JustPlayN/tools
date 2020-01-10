/**
 * 函数列表
 * @apiRouter
 * @callPhone
 * @login
 * @share
 */

import * as utils from './utils'

declare var window: Wind
export const appApi = (func: string, args: any = []) => {
  if (utils.isIos()) {
    window.webkit && window.webkit.messageHandlers[func].postMessage(args)
  } else {
    window.ypsxBridge[func](...args)
  }
}

/**
 * @function 路由跳转
 * @param url 路由地址
 * @param appObj:只在app中使用的参数
 * @param minObj:只在小程序中使用的参数 {id: 1, appObj: {name: 'name'}, minObj: {title: 'name'}}
 * @param minType:小程序跳转方式
 * @param appType:app跳转方式
 */
export const openUrl = (dataObj: any) => {
  let { url = 'goback', minObj, appObj, obj, minType = 'navigateBack', appType = '' } = dataObj || {}
  let objStrArr = []
  if (utils.isApp() && appObj) {
    for (let key in appObj) {
      objStrArr.push(`${key}=${appObj[key]}`)
    }
  }
  if (utils.isMiniProgram() && minObj) {
    for (let key in minObj) {
      objStrArr.push(`${key}=${minObj[key]}`)
    }
  }
  if (obj) {
    for (let key in obj) {
      if (key !== 'appObj' && key !== 'minObj') {
        objStrArr.push(`${key}=${obj[key]}`)
      }
    }
  }
  let objStr = objStrArr.length > 0 ? '?' + objStrArr.join('&') : ''
  if (utils.isApp()) {
    window.location.href = `${appRouter[url]}${objStr}`
  } else if (utils.isMiniProgram()) {
    switch (minType) {
      case 'switchTab':
        window.wx.miniProgram.switchTab({ url: `${url}${objStr}` })
        break
      case 'goback':
        window.wx.miniProgram.navigateBack()
        break
      case 'navigateTo':
        window.wx.miniProgram.navigateTo({ url: `${url}${objStr}` })
        break
      case 'redirectTo':
        window.wx.miniProgram.redirectTo({ url: `${url}${objStr}` })
        break
      case 'callphone':
        window.location.href = `tel://${minObj.phoneNumber}`
        break
      default:
        window.wx.miniProgram.navigateBack()
        break
    }
  } else {
    console.log('not app, not miniProgram')
  }
}

/**
 * @function 调用打电话
 * @param phone 电话号码
 */
export const callPhone = (phone: any) => {
  utils.isApp() ? appApi('callPhone', [phone]) : window.location.href = `tel://${phone}`
}

/**
 * @function 调用设置标题
 * @param title 标题
 */
export const setTitle = (title: any) => {
  utils.isApp() ? appApi('setNativeTitle', [title]) : document.title = title
}

/**
 * @function 调用打电话
 * @param phone 电话号码
 */
export const login = () => {
  utils.isApp() ? appApi('toLogin') : console.log('非app登录，小程序不需要登录')
}

/**
 * @function 分享
 * @param url 分享连接
 * @param img 分享图片
 * @param title 分享title
 */
export const share = (url: string, img: string, title: string) => {
  utils.isApp() ? appApi('goShare', [title, img, url]) : window.wx.miniProgram.postMessage({ share: { url, img, title } })
}

const appRouter: Object = {
  '/pages/index/index': 'yp://nativeLogin',                       // 首页
  '/pages/shoppingCart/main': 'yp://nativeShoppingCart',          // 购物车
  '/pages/detail/main': 'yp://nativeGoodsPage',                   // 商品详情页
  '/pages/sort/main': 'yp://nativeGoCategory',                    // 分类页
  '/pages/assemble/main': 'yp://nativeGoodsList',                 // 拼团列表
  '/pages/goodsList/main': 'yp://nativeNomalGoodsList',           // 楼层列表：app参数id、title。小程序参数id、name
  '/pages/search/main': 'yp://flutterSearch',                     // 搜索页
  '/pages/account/index': 'yp://nativeGoRechargePage',            // 充值页面
  'goback': 'yp://popPage',                                       // 返回上一页
  'goshare': 'yp://appShare',                           // 返回上一页
  'callphone': 'yp://callPhone',
}


interface Wind extends Window {
  webkit: any,
  ypsxBridge: any,
  wx: any
}

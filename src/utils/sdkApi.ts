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
 * @param obj 路由参数：appObj:只在app中使用的参数，minObj:只在小程序中使用的参数
 */
export const apiRouter = (url: string, obj: any) => {
  let objStrArr = []
  if (obj) {
    if (utils.isApp() && obj.appObj) {
      obj.appObj.map((key: string, value: any) => {
        objStrArr.push(`${key}=${value}`)
      })
    }
    if (utils.isMiniProgram() && obj.minObj) {
      obj.minObj.map((key: string, value: any) => {
        objStrArr.push(`${key}=${value}`)
      })
    }
    delete obj.appObj
    delete obj.minObj
    obj.map((key: string, value: any) => {
      if (key !== 'appObj' && key !== 'minObj') {
        objStrArr.push(`${key}=${value}`)
      }
    })
  }
  let objStr = objStrArr.length > 0 ? '?' + objStrArr.join('&') : ''
  if (utils.isApp()) {
    window.location.href = `${appRouter[url]}${objStr}`
  } else if (utils.isMiniProgram()) {
    switch (url) {
      case '/pages/index/index':
      case '/pages/shoppingCart/main':
      case '/pages/sort/main':
        window.wx.miniprogram.switchTab({ url: `${url}${objStr}` })
        break
      default:
        window.wx.miniprogram.navigateTo({ url: `${url}${objStr}` })
        break
    }
  } else {
    console.log('not app, not miniprogram')
  }
}

/**
 * @function 调用打电话
 * @param phone 电话号码
 */
export const callPhone = (phone: any) => {
  utils.isApp() ? appApi('callPhone', [phone]) : window.location.href = phone
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
  utils.isApp() ? appApi('goShare', [title, img, url]) : window.wx.miniprogram.postMessage({ share: { url, img, title } })
}

const appRouter: Object = {
  '/pages/index/index': 'yp://nativeLogin',                       // 首页
  '/pages/shoppingCart/main': 'yp://nativeShoppingCart',          // 购物车
  '/pages/detail/main': 'yp://nativeGoodsPage',                   // 商品详情页
  '/pages/sort/main': 'yp://nativeGoCategory',                    // 分类页
  '/pages/assemble/main': 'yp://nativeGoodsList',                 // 拼团列表
  '/pages/goodsList/main': 'yp://nativeNomalGoodsList',           // 楼层列表：app参数id、title。小程序参数id、name
  '/pages/search/main': 'yp://flutterSearch',                     // 搜索页
}


interface Wind extends Window {
  webkit: any,
  ypsxBridge: any,
  wx: any
}

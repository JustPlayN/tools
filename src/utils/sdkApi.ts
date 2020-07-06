/**
 * 函数列表
 * @apiRouter
 * @callPhone
 * @login
 * @share
 * @postMessage
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
  let { url = 'goback', minObj, appObj, obj, minType = '', appType = '' } = dataObj || {}
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
    if (appType === 'webview') {
      let appUrl = `${appRouter[url]}${objStr}`
      window.location.href = `yp://webViewPage?url=${encodeURIComponent(appUrl)}`
    } else {
      window.location.href = `${appRouter[url]}${objStr}`
    }
  } else if (utils.isMiniProgram()) {
    switch (minType) {
      case 'switchTab':
        window.wx.miniProgram.switchTab({ url: `${url}${objStr}` })
        break
      case 'goback':
        window.wx.miniProgram.navigateBack()
        break
      case 'goShare':
        window.wx.miniProgram.postMessage({ data: { share: minObj } })
        break
      case 'navigateTo':
        window.wx.miniProgram.navigateTo({ url: `${url}${objStr}` })
        break
      case 'reLaunch':
        window.wx.miniProgram.reLaunch({ url: `${url}${objStr}` })
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
 * @param bgColor 标题背景
 * @param titleColor 字体颜色
 */
export const setTitle = (title: any = '', bgColor: any = '', titleColor: any = '') => {
  utils.isApp() ? appApi('setNativeTitle', [title, bgColor, titleColor]) : document.title = title
}

/**
 * @function 登录
 * @param flag 是否强制登录 默认不强制
 */
export const login = (flag: boolean = false) => {
  utils.isApp() ? appApi('toLogin', [flag]) : console.log('非app登录，小程序不需要登录')
}

/**
 * @function 登录
 * @param phone 电话号码
 */
export const goToWxLive = (roomId) => {
  utils.isApp() ? appApi('goToWxLive', [roomId]) : window.wx.miniProgram.navigateTo({
    url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}`
  })
}

/**
 * @function 分享
 * @param url 分享连接
 * @param img 分享图片
 * @param title 分享title
 */
export const share = (url: string, img: string, title: string) => {
  utils.isApp() ? appApi('goShare', [title, img, url]) : window.wx.miniProgram.postMessage({ data: {share: { url, img, title }} })
}

/**
 * @function h5传参给app、小程序
 * @parm obj: { address: {} }
 */
export const postMessage = (obj) => {
  if (utils.isApp()) {
    appApi('postMessage', [JSON.stringify(obj)])
  } else if (utils.isMiniProgram()) {
    window.wx.miniProgram.postMessage({ data: obj })
  }
}

const appRouter: Object = {
  '/pages/index/index': 'yp://nativeGoHome',                      // 首页
  '/subPages/index/index': 'yp://nativeFreeShippingPage',         // 包邮首页
  '/subPages/detail/index': 'yp://nativeFreeShippingProductDetailPage',         // 包邮商品详情
  '/pages/shoppingCart/main': 'yp://nativeShoppingCart',          // 购物车
  '/pages/detail/main': 'yp://nativeGoodsPage',                   // 商品详情页
  '/pages/sort/main': 'yp://nativeGoCategory',                    // 分类页
  '/pages/assemble/main': 'yp://nativeGoodsList',                 // 拼团列表
  '/pages/goodsList/main': 'yp://nativeNomalGoodsList',           // 楼层列表：app参数id、title。小程序参数id、name
  '/pages/search/main': 'yp://flutterSearch',                     // 搜索页
  '/pages/account/index': 'yp://nativeGoRechargePage',            // 充值页面
  'goback': 'yp://popPage',                                       // 返回上一页
  '/pages/activity/index': `${window.location.origin}/promotion/activityCenter.html#/`,
  'callphone': 'yp://callPhone',
  '/pages/order/main': 'yp://nativeOrderSettlementPage',          // 订单结算
  '/subPages/applySale/index': 'yp://flutterInitRefundOrderPage', // 售后发起页
  '/pages/orderList/index': 'yp://listRefundOrder',               // 订单列表
  'goShare': 'yp://appShare'       // 分享
}


interface Wind extends Window {
  webkit: any,
  ypsxBridge: any,
  wx: any
}

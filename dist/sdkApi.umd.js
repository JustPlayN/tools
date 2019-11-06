(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.sdkApi = {}));
}(this, (function (exports) { 'use strict';

  var isMiniProgram = function () {
      if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1) {
          return false;
      }
      else {
          var minP_1 = true;
          window.wx.miniProgram.getEnv(function (res) {
              if (!res.miniprogram) {
                  minP_1 = false;
              }
          });
          return minP_1;
      }
  };
  var isApp = function () {
      return !!window.navigator.userAgent.toLowerCase().match('ypsx');
  };
  var isIos = function () {
      return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  };

  var appApi = function (func, args) {
      var _a;
      if (args === void 0) { args = []; }
      if (isIos()) {
          window.webkit && window.webkit.messageHandlers[func].postMessage(args);
      }
      else {
          (_a = window.ypsxBridge)[func].apply(_a, args);
      }
  };
  var apiRouter = function (url, obj) {
      var objStrArr = [];
      if (obj) {
          if (isApp() && obj.appObj) {
              for (var key in obj.appObj) {
                  objStrArr.push(key + "=" + obj.appObj[key]);
              }
          }
          if (isMiniProgram() && obj.minObj) {
              for (var key in obj.minObj) {
                  objStrArr.push(key + "=" + obj.minObj[key]);
              }
          }
          delete obj.appObj;
          delete obj.minObj;
          for (var key in obj) {
              if (key !== 'appObj' && key !== 'minObj') {
                  objStrArr.push(key + "=" + obj[key]);
              }
          }
      }
      var objStr = objStrArr.length > 0 ? '?' + objStrArr.join('&') : '';
      if (isApp()) {
          var urlTemp = "" + appRouter[url] + objStr;
          switch (url) {
              case 'goshare':
                  urlTemp = encodeURIComponent("" + appRouter[url] + objStr);
                  break;
          }
          window.location.href = urlTemp;
      }
      else if (isMiniProgram()) {
          switch (url) {
              case '/pages/index/index':
              case '/pages/shoppingCart/main':
              case '/pages/sort/main':
                  window.wx.miniProgram.switchTab({ url: "" + url + objStr });
                  break;
              case 'goback':
                  window.wx.miniProgram.navigateBack();
                  break;
              default:
                  window.wx.miniProgram.navigateTo({ url: "" + url + objStr });
                  break;
          }
      }
      else {
          console.log('not app, not miniProgram');
      }
  };
  var callPhone = function (phone) {
      isApp() ? appApi('callPhone', [phone]) : window.location.href = "tel://" + phone;
  };
  var login = function () {
      isApp() ? appApi('toLogin') : console.log('非app登录，小程序不需要登录');
  };
  var share = function (url, img, title) {
      isApp() ? appApi('goShare', [title, img, url]) : window.wx.miniProgram.postMessage({ share: { url: url, img: img, title: title } });
  };
  var appRouter = {
      '/pages/index/index': 'yp://nativeLogin',
      '/pages/shoppingCart/main': 'yp://nativeShoppingCart',
      '/pages/detail/main': 'yp://nativeGoodsPage',
      '/pages/sort/main': 'yp://nativeGoCategory',
      '/pages/assemble/main': 'yp://nativeGoodsList',
      '/pages/goodsList/main': 'yp://nativeNomalGoodsList',
      '/pages/search/main': 'yp://flutterSearch',
      '/pages/account/index': 'yp://flutterSearch',
      'goback': 'yp://popPage',
      'goshare': 'yp://appShare'
  };

  exports.apiRouter = apiRouter;
  exports.appApi = appApi;
  exports.callPhone = callPhone;
  exports.login = login;
  exports.share = share;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

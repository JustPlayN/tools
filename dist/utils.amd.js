define(['exports'], function (exports) { 'use strict';

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
  var getCookie = function (name) {
      var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
      var arr = document.cookie.match(reg);
      if (arr) {
          return unescape(arr[2]);
      }
      else {
          return null;
      }
  };
  var setCookie = function (cName, value, maxAge) {
      var domainArr = window.location.host.split('.');
      var domain = '';
      if (domainArr.length === 3) {
          domainArr.shift();
          domain = domainArr.join('.');
      }
      document.cookie = cName + '=' + escape(value) + ((maxAge === null) ? '' : ';max-age=' + maxAge) + ';path=/;domain=' + domain;
  };
  var getUid = function () {
      return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  };
  var loadJs = function (src) {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.src = src;
      document.body.appendChild(script);
      script.onload = function () {
          return true;
      };
  };
  var getUrlParam = function (name, url) {
      var urlStr = url || window.location.href;
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var str = /\?/.test(urlStr) ? urlStr.split('?')[1] : '';
      var r = str.match(reg);
      if (r != null) {
          return unescape(decodeURIComponent(r[2]));
      }
      else {
          return null;
      }
  };

  exports.getCookie = getCookie;
  exports.getUid = getUid;
  exports.getUrlParam = getUrlParam;
  exports.isApp = isApp;
  exports.isIos = isIos;
  exports.isMiniProgram = isMiniProgram;
  exports.loadJs = loadJs;
  exports.setCookie = setCookie;

  Object.defineProperty(exports, '__esModule', { value: true });

});

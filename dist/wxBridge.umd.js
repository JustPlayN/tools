(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var loadJs = function (src) {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.src = src;
      document.body.appendChild(script);
      script.onload = function () {
          return true;
      };
  };

  if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
      loadJs('https://res.wx.qq.com/open/js/jweixin-1.3.2.js');
  }

})));

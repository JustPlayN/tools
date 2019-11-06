define(function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        isMiniProgram: isMiniProgram,
        isApp: isApp,
        isIos: isIos,
        getCookie: getCookie,
        setCookie: setCookie,
        getUid: getUid,
        loadJs: loadJs,
        getUrlParam: getUrlParam
    });

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

    var sdkApi = /*#__PURE__*/Object.freeze({
        __proto__: null,
        appApi: appApi,
        apiRouter: apiRouter,
        callPhone: callPhone,
        login: login,
        share: share
    });

    var accMul = function (value, multiplier) {
        if (value === void 0) { value = 0; }
        if (multiplier === void 0) { multiplier = 100; }
        var m = 0;
        var s1 = String(value);
        var s2 = String(multiplier);
        try {
            m += s1.split('.')[1].length;
        }
        catch (e) {
            console.log(e);
        }
        try {
            m += s2.split('.')[1].length;
        }
        catch (e) {
            console.log(e);
        }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    };
    var accDiv = function (val, div) {
        if (val === void 0) { val = 0; }
        if (div === void 0) { div = 100; }
        var divsion = div || 100;
        var value = val || 0;
        var t1 = 0;
        var t2 = 0;
        var s1 = String(value);
        var s2 = String(divsion);
        if (/\./.test(s1)) {
            t1 = s1.split('.')[1].length;
        }
        if (/\./.test(s2)) {
            t2 = s2.split('.')[1].length;
        }
        return (Number(s1.replace('.', '')) / Number(s2.replace('.', ''))) * Math.pow(10, t2 - t1);
    };
    var countDown = function (endTime, timer, callBack, showDay) {
        if (showDay === void 0) { showDay = true; }
        if (!endTime) {
            return;
        }
        if (timer) {
            clearInterval(timer);
        }
        var countdown = 0;
        var d = 0;
        var h = 0;
        var m = 0;
        var s = 0;
        timer = setInterval(function () {
            countdown = endTime - new Date().getTime();
            if (countdown > 0) {
                d = showDay ? Math.floor(countdown / 86400000) : 0;
                h = Math.floor((countdown - d * 86400000) / 3600000);
                m = Math.floor((countdown - d * 86400000 - h * 3600000) / 60000);
                s = Math.floor((countdown - d * 86400000 - h * 3600000 - m * 60000) / 1000);
                h = h < 10 ? "0" + h : h;
                m = m < 10 ? "0" + m : m;
                s = s < 10 ? "0" + s : s;
                if (showDay) {
                    callBack({ timer: timer, end: false, timeObj: { d: d, h: h, m: m, s: s } });
                }
            }
            else {
                callBack({ timer: null, end: true, timeObj: { d: 0, h: '00', m: '00', s: '00' } });
                clearInterval(timer);
            }
        }, 1000);
    };
    var img = function (url, w, h, m) {
        if (m === void 0) { m = 'fill'; }
        var urlReg = /ss1\.ypshengxian\.com/;
        var turlReg = /(test-oss)|(resources)\.ypshengxian\.com/;
        var imgReg = /https?:/;
        if (!imgReg.test(url)) {
            url = 'https://ss1.ypshengxian.com/minypdj/ypdft.jpg';
        }
        if (urlReg.test(url)) {
            var str = url.match(/(\S*)\?/) ? url.match(/(\S*)\?/)[1] : url;
            var width = w ? ",w_" + w : '';
            var height = h ? ",h_" + h : '';
            var mode = w && h ? ",m_" + m : '';
            return str + "?x-oss-process=image/resize" + mode + height + width;
        }
        else if (turlReg.test(url)) {
            var str = url.match(/(\S*)\?/) ? url.match(/(\S*)\?/)[1] : url;
            var width = w ? "/w/" + w : '';
            var height = h ? "/h/" + h : '';
            return str + "?style=imageView2/1" + width + height + "/q/100";
        }
        else {
            return url;
        }
    };
    var throttle = function (func, wait, options) {
        if (wait === void 0) { wait = 600; }
        var timeout = null, context = null, args = null;
        var previous = 0;
        if (!options)
            options = {
                trailing: false
            };
        var later = function () {
            previous = options.leading === false ? 0 : new Date().getTime();
            timeout = null;
            func.apply(context, args);
            if (!timeout)
                context = args = null;
        };
        var throttled = function () {
            var now = new Date().getTime();
            if (!previous && options.leading === false)
                previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(context, args);
                if (!timeout)
                    context = args = null;
            }
            else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
        };
        throttled.cancel = function () {
            clearTimeout(timeout);
            previous = 0;
            timeout = null;
        };
        return throttled;
    };
    var debounce = function (func, wait, immediate) {
        if (wait === void 0) { wait = 600; }
        if (immediate === void 0) { immediate = true; }
        var timeout = null, result = null;
        var debounced = function () {
            var context = this;
            var args = arguments;
            if (timeout)
                clearTimeout(timeout);
            if (immediate) {
                var callNow = !timeout;
                timeout = setTimeout(function () {
                    timeout = null;
                }, wait);
                if (callNow)
                    result = func.apply(context, args);
            }
            else {
                timeout = setTimeout(function () {
                    func.apply(context, args);
                }, wait);
            }
            return result;
        };
        debounced.cancel = function () {
            clearTimeout(timeout);
            timeout = null;
        };
        return debounced;
    };

    var tools = /*#__PURE__*/Object.freeze({
        __proto__: null,
        accMul: accMul,
        accDiv: accDiv,
        countDown: countDown,
        img: img,
        throttle: throttle,
        debounce: debounce
    });

    var ypTools = __assign(__assign(__assign({}, sdkApi), tools), utils);

    return ypTools;

});

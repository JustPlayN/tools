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

export { accDiv, accMul, countDown, debounce, img, throttle };

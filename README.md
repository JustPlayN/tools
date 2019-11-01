# yp-tools

## 当前tools模块及方法

### sdkApi app及小程序通用的方法

```javscript
1. apiRouter          // 路由跳转
2. callPhone          // 打电话
3. login              // app登录
4. share              // 分享
```

### tools 常用函数

```javscript
1. accMul             // 小数乘法
2. accDiv             // 小数除法
3. countDown          // 倒计时
4. img                // 图片处理
5. throttle           // 节流
6. debounce           // 防抖
```

### utils 常用小工具

```javscript
1. isMiniProgram      // 是否是小程序
2. isApp              // 是否是app
3. isIos              // 是否是ios
4. getCookie          // 获取cookie
5. setCookie          // 设置cookie
6. getUid             // 生成uid
7. loadJs             // 文件连接懒加载
8. getUrlParam        // 获取连接参数
```

### 本地测试

``` bash
npm run dev
```

### 发布正式版本：分支master

``` bash
1. 发布准备：https://wiki.ypsx-internal.com/pages/viewpage.action?pageId=15368399
2. 修改版本号
3. 打包：npm run build
4. 发布：npm publish
5. 使用：npm i -S yp-tools
```

### 发布beta版本

``` bash
1. master切分支---开发自测---合并到beta分支
2. 修改版本号
3. 打包：npm run build
4. 发布：npm publish --tag beta
5. 使用：npm i -S yp-tools@beta
```

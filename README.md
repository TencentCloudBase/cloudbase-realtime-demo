# 云开发实时聊天室

这是一个使用[云开发](https://www.cloudbase.net/)各项能力开发的实时聊天室 Demo

## 如何开始

### 准备工作

1. [开通云开发环境](https://docs.cloudbase.net/quick-start/create-env.html)
2. [开启匿名登录](https://docs.cloudbase.net/authentication/anonymous.html#kai-tong-liu-cheng)
3. 在数据库中创建一个集合 `messages`
4. 添加 `localhost:3000` 到安全域名，可以参考[这里](https://docs.cloudbase.net/quick-start/web.html#di-2-bu-tian-jia-an-quan-yu-ming)

### 第 1 步：下载项目与安装依赖
```
git clone https://github.com/TencentCloudBase/cloudbase-realtime-demo.git
cd cloudbase-realtime-demo
npm install
```

### 第 2 步：修改部分代码

在 `src/App.js` 中的初始化代码中，填入你的环境 ID：

```js
const app = cloudbase.init({
  env: "**your-env-id**",
});
```

### 第 3 步：开启开发环境

```
npm run start
```

打开浏览器 http://localhost:3000 ，即可预览。

### 第 4 步：构建

```
npm run build
```

构建结果将会输出到 `build` 目录下。

更多信息可以参考： [deployment](https://facebook.github.io/create-react-app/docs/deployment)。

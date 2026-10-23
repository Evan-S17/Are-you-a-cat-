# 猫联网 · 猫类身份验证

一个假装严肃的猫类身份验证小游戏。React + TypeScript + Vite，纯前端，无账号、API 或后端服务。所有场景插画使用原创 SVG / CSS，无外部图片或字体请求。

## 本地开发

需要 Node.js 22+。

```sh
npm ci
npm run dev
```

## 构建与测试

```sh
npm run build
npm test
```

浏览器测试默认使用本环境的 `/usr/bin/chromium`。其他机器可修改 `playwright.config.ts` 的 executablePath 或使用 Playwright 安装的 Chromium。

## 玩法

勾选“我不是人类”，依次通过纸箱、推杯子、踩键盘、反复开门、扒掉按钮五关。拖拽支持鼠标与触摸；键盘关也提供屏幕按键。错误操作增加趣味记录，不会导致重开。帮助按钮提供当前关提示。

进度条末端的线头可以拨动；最后一关累计拨动三次可触发隐藏结局。通关后生成认证书。刷新恢复到当前关卡起点；“重新验证”清空本局进度。

设置支持静音和系统减少动态效果偏好。游戏进度仅保存在浏览器 localStorage 中。

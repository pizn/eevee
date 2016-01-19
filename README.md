# Eevee - 伊布

[![Build Status](https://travis-ci.org/pizn/eevee.svg?branch=master)](https://travis-ci.org/pizn/eevee)

基于 Github Page 的在线编辑平台，让你更加专注于内容的编写.

### 初衷

像黑客一样写博客太麻烦了,直接就在浏览器,专注于内容不是更好么?于是就有了它的诞生.

### 构成

纯前端实现,通过 GitHub API 与你在 GitHub 上的代码库取得联系,可以在 `Eevee` 上完成你对文章协作的需求.

### 如何使用

1. 使用 GitHub 账号登录 Eevee（前提是你已经基于 GitHub Pages 简历好博客了）
2. 选择文件,编辑, `Command + s` 保存即可
3. 稍等片刻,你的博客则刷新出新的文章了

### 参与开发

该项目基于 React + Ant Design + GitHub API 完成.

1. npm install 
2. npm run hot-dev-server
3. npm run dev

### 特性

- [ ] 登录 GitHub 账号,获取 `*.github.io` 或者 `*.github.com` 的 Project
- [ ] 获取 `_posts` 的所有文档（仅 markdown ）
- [ ] 添加文章
- [ ] 编辑文章
- [ ] 删除文章

### 计划

- [ ] 可自动创建 Project
- [ ] 提供草稿编辑功能
- [ ] 管理图片等静态文件功能
- [ ] 编辑配置

### license

Licensed under MIT.


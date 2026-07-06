# KeidoNav — 整点薯条 导航站

> AI Agent 速查文件，项目地址: `https://github.com/sonofrain/KeidoNav`

## 项目概述

一个纯前端静态导航网站，托管于 Cloudflare Pages / GitHub Pages。首页展示搜索栏+多类别链接卡片，背景随机图片，底部一言引用。

## 技术栈

- **纯 HTML/CSS/JS**（无框架、无构建工具）
- 图标格式多样：`.png`, `.svg`, `.ico`, `.jfif`, `.webp`
- 通过 `fetch()` 动态加载 `includes/` 下的 HTML 片段拼装页面

## 目录结构

```
KeidoNav/
├── index.html              # 主页，CSS/JS 入口，fetch 加载各 includes
├── styles/
│   └── main.css            # 全局样式
├── scripts/
│   ├── image_list.js       # 背景图片列表（generate_image_list.sh/bat 生成）
│   ├── randomPic.js        # 随机背景图逻辑
│   ├── updateTime.js       # UTC / 北京时间显示
│   ├── hitokoto.js         # 一言 API 调用
│   ├── weather.js          # 天气组件
│   └── search.js           # 搜索引擎切换
├── includes/
│   ├── random-links.html   # 「随便看看」类别卡片
│   ├── ai-links.html       # 「AI」类别卡片
│   ├── download-links.html # 「下载站」类别卡片
│   ├── resources-links.html# 「素材库」类别卡片
│   └── edge-services-links.html # 「边缘服务」类别卡片
├── images/
│   ├── icon/               # 所有链接图标（本地存储）
│   └── background/         # 背景图片
├── mysoftconfig/           # 子页面：软件配置清单
│   ├── index.html
│   ├── mysoftconfig.css
│   ├── render-cards.js
│   ├── config-data.js
│   └── config-data.json
├── generate_image_list.sh  # 生成 images/background 列表到 scripts/image_list.js
└── generate_image_list_win.bat # Windows 版本
```

## 链接类别与文件对应

| 类别 | 文件 | 当前卡片数量 |
|------|------|-------------|
| 随便看看 | `includes/random-links.html` | 12 个 |
| AI | `includes/ai-links.html` | 9 个 |
| 下载站 | `includes/download-links.html` | 6 个 |
| 素材库 | `includes/resources-links.html` | 3 个 |
| 边缘服务 | `includes/edge-services-links.html` | 3 个 |

## 添加新链接的标准模式

在对应 `includes/xxx-links.html` 的 `<div class="links-grid">` 内，按照以下模板添加：

```html
<a href="https://example.com" class="link-item">
  <img
    class="link-icon-img"
    src="images/icon/example-icon.png"
    alt="Example 图标"
  />
  <div class="link-text">
    <span class="link-title">网站名称</span>
    <span class="link-description">简短描述，不要太长</span>
  </div>
</a>
```

**图标规范：**
- 图标必须下载到 `images/icon/` 目录，不可外链
- 优先使用 SVG 格式，其次 PNG
- 文件名用小写英文，用连字符分隔
- 图标资源从网站 favicon 或 Google Favicon 服务获取

## 引用的外部资源

- 一言 API（`hitokoto.js` 中调用，用于页脚名言）
- 天气 API（`weather.js` 中调用）

## 部署

- 静态文件托管，推送到 `main` 分支自动部署
- 无服务端依赖，纯浏览器端运行

## 修改注意事项

1. 修改 `includes/` 下 HTML 不影响主页结构变更
2. 新增图标必须存本地 `images/icon/` 目录
3. CSS 在 `styles/main.css` 统一管理
4. 背景图由 `scripts/image_list.js` 驱动，新增背景图后需运行 `generate_image_list_win.bat` 更新

## Git 信息

- 远程: `origin: https://github.com/sonofrain/KeidoNav.git`
- 当前部署分支: `main`
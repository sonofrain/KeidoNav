# 🚀 KeidoNav for serv00 🚀

需要一个简洁、快速且 **超级可定制** 的网页起点吗？

**KeidoNav** 就是你的答案！这是一个羽量级、纯静态的导航页面，专为简洁性和 serv00 的 FreeBSD 环境而设计（当然，它实际上在任何地方都能用！）。把它想象成你构建数字世界的个人、极简启动台。

✨ **在线演示:** 前往 [**nav.mayoi.de**](https://nav.iore.de/) 查看实际效果 ✨

## 特性

*   ⚡ **纯静态:** 闪电般的加载速度。无需数据库，无需服务器端渲染（除了可选的图片列表生成器）。只有纯粹的 HTML、CSS 和一点点 JavaScript。
*   📁 **傻瓜式部署:** 上传文件，搞定。真的就是这么简单。
*   🎨 **高度可定制:** 轻松更改链接、文本，特别是背景图片，以符合你的风格。
*   🖼️ **动态背景:** 使用简单的脚本，自动为桌面（横屏）和移动设备（竖屏）选择合适的背景。当然，如果你喜欢，也可以设置固定的背景！
*   🍃 **轻量 & 简洁:** 保持内容极简和专注。
*   🔧 **Serv00 友好** 


## 🚀 快速上手与使用

在你的 serv00 实例（或任何网络服务器）上设置 KeidoNav 非常简单：

*   核心：将 KeidoNav 项目中的 **所有** 文件和文件夹（`index.html`, `scripts/`, `images/`, `generate_image_list.sh` 等）直接放入网站目录中。
serv00的网址目录为 /domains/你的域名/public_html/

*   可选方法

git clone https://github.com/sonofrain/KeidoNav.git 你的网站目录

这个方法要求你的网站目录必须是空目录

进入网站目录运行



```sh


chmod +x ./generate_image_list.sh && \
./generate_image_list.sh && \
```


**(可选但推荐) 运行图像列表生成器:**
    *   如果你打算使用随机背景功能，你需要生成初始的图片列表。请参阅下面的“更新图片列表”部分了解**必要步骤**。

**访问你的网站:**
    *   在浏览器中打开你的网站 URL。KeidoNav 应该已经上线了！

## 🎨 定制化

让 KeidoNav 真正属于你！

### 修改链接、分类和文本

定制 KeidoNav 的内容非常直接，主要通过编辑 `index.html` 文件完成：

1.  **打开文件:** 使用你喜欢的文本编辑器打开项目根目录下的 `index.html` 文件。

2.  **修改/添加/删除分类:**
    *   **结构:** 每个链接分类由一个 `<section class="category">...</section>` 代码块定义。
    *   **修改标题:** 找到分类代码块内的 `<h2>...</h2>` 标签，修改其中的文本即可更改分类名称（例如，将 `<h2>AI</h2>` 改为 `<h2>常用工具</h2>`）。
    *   **添加新分类:** 复制一个完整的 `<section class="category">...</section>` 代码块，粘贴到你想要的位置，然后修改新分类的 `<h2>` 标题和内部的链接。
    *   **删除分类:** 直接删除你不再需要的整个 `<section class="category">...</section>` 代码块。

3.  **修改/添加/删除链接:**
    *   **结构:** 在每个分类的 `<div class="links-grid">...</div>` 内部，每一个链接由一个 `<a href="..." class="link-item">...</a>` 代码块表示。
    *   **修改现有链接:**
        *   **目标网址:** 更改 `<a>` 标签的 `href="..."` 属性值。
        *   **图标:** 更改 `<img>` 标签的 `src="..."` 属性为你新图标的路径（例如 `images/icon/new-icon.png`）。同时，最好也更新 `alt="..."` 属性为图标的描述文字。
        *   **链接标题:** 修改 `<span class="link-title">...</span>` 标签内的文本。
        *   **链接描述:** 修改 `<span class="link-description">...</span>` 标签内的文本。
    *   **添加新链接:** 在目标分类的 `<div class="links-grid">` 内，复制一个现有的 `<a ... class="link-item">...</a>` 代码块，粘贴后，修改其 `href`, `src`, `alt`, 链接标题文本和链接描述文本。
    *   **删除链接:** 删除你不需要的那个链接对应的整个 `<a ... class="link-item">...</a>` 代码块。

4.  **修改其他文本:**
    *   页面主标题（通常在 `<header>` 或靠近 `<body>` 开头的地方）、页脚信息（通常在 `<footer>` 或页面底部）等其他文本，也可以直接在 `index.html` 文件中找到并修改。

**简单来说，就是通过编辑 HTML 结构来直接增删改查页面上显示的分类和链接内容。**


### 自定义背景图片

默认情况下，KeidoNav 使用 `scripts/randomPic.js` 脚本为宽屏（电脑）和窄屏（移动设备）提供不同的随机背景。

1.  **放置你的图片:**
    *   将你的 **横屏** (水平) 图片放入 `images/background/computer/` 目录。
    *   将你的 **竖屏** (垂直) 图片放入 `images/background/mobile/` 目录。
    *   通常支持的格式包括 `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`。

2.  **更新图片列表（关键！）：**
    *   `randomPic.js` 脚本 **需要** 知道哪些图片可用。在你添加/删除图片后，**必须** 运行 `generate_image_list.sh` 脚本。详细说明请参见下一节。

3.  **替代方案：禁用随机图片:**
    *   如果你更喜欢 **一个固定的背景图片**，你可以：
        1.  在 `index.html` 中 **移除或注释掉** 脚本引用行。找到靠近底部的这行：
            ```html
            <!-- 注释掉或删除此行以禁用随机背景 -->
            <script src="scripts/randomPic.js"></script>
            ```
        2.  **直接使用 CSS 设置背景**。你可以在 `index.html` 的 `<head>` 中添加一个样式块，或者修改现有的 CSS 文件（例如 `css/style.css`）：
            ```css
            body {
                /* 添加或修改此规则 */
                background-image: url('images/your_chosen_background.jpg');
                background-size: cover; /* 背景图片覆盖整个区域 */
                background-position: center; /* 背景图片居中显示 */
                background-attachment: fixed; /* 可选：滚动时背景图固定 */
            }
            ```
            将 `'images/your_chosen_background.jpg'` 替换为你选择的图片的正确路径。

## 🛠️ 更新图片列表 (`generate_image_list.sh`)

这个脚本会扫描 `computer` 和 `mobile` 背景图片文件夹，并创建 `image_list.json` 这个 json 文件，供 `randomPic.js` 使用。

（可选）用cron设置定时任务。

**🚨 必要条件:** 你的 serv00 系统（或任何运行此脚本的地方）**必须** 安装了 `bash`。

// 软件配置数据
const configData = {
  "title": "软件配置清单",
  "subtitle": "记录常用软件及相关设置，方便快速配置新环境",
  "categories": [
    {
      "id": "writing-tools",
      "name": "写作工具",
      "icon": "✏️",
      "items": [
        {
          "id": "typora",
          "name": "Typora",
          "version": "1.9.5",
          "description": "Markdown 编辑器图像设置配置",
          "lastModified": "2025-10-31",
          "tags": ["图像路径", "相对路径", "本地图片", "网络图片"],
          "settings": [
            "插入图片时：复制到指定路径 ./assets/${filename}",
            "勾选：对本地位置的图片应用上述规则",
            "勾选：对网络位置的图片应用上述规则",
            "勾选：优先使用相对路径",
            "不要勾选：为相对路径添加./ （可能导致相对路径失效）"
          ]
        }
      ]
    }
  ]
};
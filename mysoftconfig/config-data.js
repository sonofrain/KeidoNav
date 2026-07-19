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
        },
        {
          "id": "office-tools",
          "name": "办公软件",
          "icon": "📊",
          "items": [
            {
              "id": "bukenghezi-wps-plugin",
              "name": "不坑盒子-WPS插件",
              "description": "WPS插件，用于表格处理，可指定列为参考拆分表格，拆分结果为多个标签，每个标签名为指定列中的关键词，且可以保留表头。",
              "lastModified": "2025-11-01",
              "tags": ["WPS", "插件", "表格处理", "拆分表格", "数据处理"],
              "settings": [
                "功能：表格处理-拆分表-可指定列为参考拆分表格，拆分结果为多个标签，每个标签名为指定列中的关键词，且可以保留表头。"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "system-tools",
      "name": "系统工具",
      "icon": "⚙️",
      "items": [
        {
          "id": "huorong-throttlestop",
          "name": "火绒安全软件",
          "description": "放行 ThrottleStop 驱动，解决驱动被火绒漏洞拦截的问题",
          "lastModified": "2026-07-19",
          "tags": ["火绒", "ThrottleStop", "驱动", "安全"],
          "settings": [
            "进入火绒设置 → 系统防护 → 漏洞驱动拦截",
            "添加例外驱动，填入SHA1哈希值：82ED942A52CDCF120A8919730E00BA37619661A3",
            "保存即可，ThrottleStop 驱动将不再被拦截"
          ]
        }
      ]
    }
  ]
};
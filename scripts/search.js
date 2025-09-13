// Search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  const searchEngineSelect = document.getElementById("search-engine");
  const searchQueryInput = document.getElementById("search-query");

  searchForm.addEventListener("submit", function (event) {
    // 1. 阻止表单的默认提交行为
    event.preventDefault();

    // 2. 获取选中的搜索引擎的基础URL
    const engineUrl = searchEngineSelect.value;

    // 3. 获取用户输入的搜索关键词
    const query = searchQueryInput.value.trim(); // trim() 去除首尾空格

    // 检查搜索内容是否为空
    if (query === "") {
      alert("请输入搜索内容！"); // 提示用户
      searchQueryInput.focus(); // 将焦点设置回输入框
      return; // 阻止后续操作
    }

    // 4. 将它们拼接成完整的搜索URL
    //    使用 encodeURIComponent 对查询词进行URL编码，以处理特殊字符（如空格、&等）
    const searchUrl = engineUrl + encodeURIComponent(query);

    // 5. 让浏览器跳转到这个新的URL (在当前窗口打开)
    window.location.href = searchUrl;

    // 如果想在新标签页中打开，可以使用:
    // window.open(searchUrl, '_blank');
  });

  // Only auto-focus search on desktop devices
  if (window.innerWidth > 768) {
    document.getElementById("search-query").focus();
  }
});

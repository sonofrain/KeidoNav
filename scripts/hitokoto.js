        // 获取用于显示一言的 P 标签元素
        const hitokotoElement = document.getElementById('hitokoto-quote');
        // 一言 API 的 URL
        const hitokotoApiUrl = 'https://v1.hitokoto.cn/?c=b';

        // 使用 fetch API 获取数据
        fetch(hitokotoApiUrl)
            .then(response => {
                // 检查响应是否成功 (status code 200-299)
                if (!response.ok) {
                    // 如果不成功，抛出错误，会被下面的 .catch() 捕获
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // 解析返回的 JSON 数据
                return response.json();
            })
            .then(data => {
                // 检查获取到的数据以及是否包含 hitokoto 字段
                if (data && data.hitokoto) {
                    // 构建要显示的完整句子，可以加上来源（如果存在）
                    let quoteText = `「${data.hitokoto}」`;
                    if (data.from) {
                        quoteText += ` —— ${data.from}`;
                    }
                    // 更新 P 标签的文本内容
                    hitokotoElement.textContent = quoteText;
                } else {
                    // 如果数据格式不正确
                    console.error('API 返回的数据格式不正确:', data);
                    hitokotoElement.textContent = '加载一言数据格式错误';
                }
            })
            .catch(error => {
                // 捕获 fetch 过程中的任何错误 (网络问题、解析错误等)
                console.error('获取一言失败:', error);
                // 在页面上显示错误信息
                hitokotoElement.textContent = '加载一言失败，请稍后重试';
            });

        /*
        // 如果你还想更新年份 (取消下面注释即可)
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
        */
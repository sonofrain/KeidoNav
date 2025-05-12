        // 获取用于显示一言的 P 标签元素
        const hitokotoElement = document.getElementById('hitokoto-quote');
        // 一言 API 的 URL
        const primaryHitokotoApiUrl = 'https://v1.hitokoto.cn/?c=b';
        const secondaryHitokotoApiUrl = 'https://international.v1.hitokoto.cn/?c=b'; // 备用接口

        // 封装获取和处理数据的函数，方便复用
        function fetchAndProcessHitokoto(apiUrl) {
            return fetch(apiUrl)
                .then(response => {
                    // 检查响应是否成功 (status code 200-299)
                    if (!response.ok) {
                        // 如果不成功，抛出错误，会被下面的 .catch() 捕获
                        // 在错误信息中包含 URL，方便调试
                        throw new Error(`HTTP error! status: ${response.status} for URL: ${apiUrl}`);
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
                        console.log(`成功从 ${apiUrl} 获取一言`);
                    } else {
                        // 如果数据格式不正确
                        console.error(`API (${apiUrl}) 返回的数据格式不正确:`, data);
                        // 抛出错误，以便后续的 catch 可以捕获，或者触发备用逻辑（如果这是第一次尝试）
                        throw new Error(`API (${apiUrl}) data format error`);
                    }
                });
        }

        const defaultQuotes = [
                '心之所向，素履以往',
                '时间静止于此',
                '保持好奇',
                '你好，世界',
                '知足常乐，安之若素',
                '素心向暖，爱意绵长',
                '愿爱如灯，长明不灭',
                '蒹葭淒淒、白露未晞',
                '咕咕嘎嘎'
            ];

        // 尝试主接口
        fetchAndProcessHitokoto(primaryHitokotoApiUrl)
            .catch(error => {
                // 主接口请求失败
                console.warn(`主接口 (${primaryHitokotoApiUrl}) 请求失败:`, error.message);
                console.log('尝试使用备用接口...');
                // 尝试备用接口
                return fetchAndProcessHitokoto(secondaryHitokotoApiUrl)
                    .catch(fallbackError => {
                        console.error('获取一言失败:', error);
                        // 从列表中随机选择一个默认引用
                        const randomIndex = Math.floor(Math.random() * defaultQuotes.length);
                        hitokotoElement.textContent = `「${defaultQuotes[randomIndex]}」`;
                    });
            });

        /*
        // 如果你还想更新年份 (取消下面注释即可)
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
        */

// --- 页面加载完成后执行所有脚本 ---
document.addEventListener('DOMContentLoaded', function() {

    // --- 更新时间和日期 (UTC 和 北京时间) ---
    const utcTimeElement = document.getElementById('utc-time'); // 需要在 HTML 中添加 <span id="utc-time"></span>
    const beijingTimeElement = document.getElementById('beijing-time'); // 需要在 HTML 中添加 <span id="beijing-time"></span>
    const timeApiUrl = 'https://worldtimeapi.org/api/timezone/Etc/UTC'; // 全球通用的 UTC 时间 API

    let timeOffset = 0; // 客户端时间与真实 UTC 时间的毫秒差
    let apiFetchAttempted = false; // 标记是否已尝试获取 API 时间
    let intervalId = null; // 用于存储 setInterval 的 ID，方便后续清除（如果需要）

    // 更新显示时间的函数
    function updateDisplayTime() {
        if (!utcTimeElement || !beijingTimeElement) {
            console.warn("未找到用于显示时间的 HTML 元素 (utc-time 或 beijing-time)");
            if (intervalId) clearInterval(intervalId); // 如果元素不存在，停止更新
            return;
        }

        // 1. 获取当前客户端时间戳
        const nowClientTimestamp = Date.now(); // 等同于 new Date().getTime()

        // 2. 应用时间差，得到校准后的 UTC 时间戳
        // 如果 API 获取失败，timeOffset 会是 0，此时就使用客户端原始时间
        const correctedUtcTimestamp = nowClientTimestamp + timeOffset;
        const correctedUtcDate = new Date(correctedUtcTimestamp);

        // 3. 计算北京时间戳 (UTC+8)
        const beijingTimestamp = correctedUtcTimestamp + 8 * 60 * 60 * 1000; // 加上 8 小时对应的毫秒数
        const beijingDate = new Date(beijingTimestamp); // 这个 Date 对象内部存储的是北京时间的时间戳

        // 4. 格式化时间字符串
        // UTC 时间 (格式: YYYY-MM-DD HH:MM:SS) - 使用 getUTC* 方法
        const utcYear = correctedUtcDate.getUTCFullYear();
        const utcMonth = String(correctedUtcDate.getUTCMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
        const utcDay = String(correctedUtcDate.getUTCDate()).padStart(2, '0');
        const utcHours = String(correctedUtcDate.getUTCHours()).padStart(2, '0');
        const utcMinutes = String(correctedUtcDate.getUTCMinutes()).padStart(2, '0');
        const utcSeconds = String(correctedUtcDate.getUTCSeconds()).padStart(2, '0');
        const utcTimeString = `${utcYear}-${utcMonth}-${utcDay} ${utcHours}:${utcMinutes}:${utcSeconds}`;

        // 北京时间 (格式: YYYY-MM-DD HH:MM:SS)
        // **关键修复**: 因为 beijingTimestamp 已经是 UTC+8 的时间戳，
        // 我们需要从 beijingDate 对象中提取 UTC 时间分量，这样才能得到正确的北京时间数值。
        // 如果使用 getHours() 等非 UTC 方法，会受到浏览器本地时区的二次影响，导致错误。
        const bjYear = beijingDate.getUTCFullYear();
        const bjMonth = String(beijingDate.getUTCMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
        const bjDay = String(beijingDate.getUTCDate()).padStart(2, '0');
        const bjHours = String(beijingDate.getUTCHours()).padStart(2, '0');
        const bjMinutes = String(beijingDate.getUTCMinutes()).padStart(2, '0');
        const bjSeconds = String(beijingDate.getUTCSeconds()).padStart(2, '0');
        const beijingTimeString = `${bjYear}-${bjMonth}-${bjDay} ${bjHours}:${bjMinutes}:${bjSeconds}`;

        // 5. 更新 HTML 元素内容
        utcTimeElement.textContent = `${utcTimeString}`;
        beijingTimeElement.textContent = `${beijingTimeString}`;

        // 首次从 API 获取成功后，打印提示
        if (apiFetchAttempted && timeOffset !== 0) {
            // console.log("时间已通过 API 校准");
            apiFetchAttempted = false; // 不再重复打印
        }
    }

    // 尝试从 API 获取精确 UTC 时间来计算时间差
    function fetchAccurateTime() {
        if (!utcTimeElement || !beijingTimeElement) return; // 如果没有显示元素，则不尝试获取

        utcTimeElement.textContent = "加载中...";
        beijingTimeElement.textContent = "加载中...";

        fetch(timeApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 错误! 状态: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // data.unixtime 是 Unix 时间戳 (秒), 代表准确的 UTC 时间
                if (data.unixtime) {
                    const accurateUtcTimestamp = data.unixtime * 1000; // 转换为毫秒
                    const clientTimestampAtFetch = Date.now(); // 获取 API 响应时的客户端时间戳
                    // 计算客户端时钟与真实 UTC 的偏差
                    // timeOffset = 真实UTC时间戳 - 客户端时间戳
                    // 如果客户端快了，offset 为负；如果客户端慢了，offset 为正。
                    timeOffset = accurateUtcTimestamp - clientTimestampAtFetch;
                    console.log(`成功从 ${timeApiUrl} 获取时间，计算出的客户端时间偏差: ${timeOffset}ms`);
                    apiFetchAttempted = true; // 标记已尝试且成功
                } else {
                    throw new Error("API 响应中缺少 unixtime 数据");
                }
            })
            .catch(error => {
                console.warn(`无法从 ${timeApiUrl} 获取准确时间: ${error.message}. 将回退使用客户端本地时间。`);
                timeOffset = 0; // 获取失败，不进行校准
                apiFetchAttempted = true; // 标记已尝试但失败
            })
            .finally(() => {
                // 无论成功或失败，都立即更新一次时间显示
                updateDisplayTime();
                // 然后设置定时器，每秒更新一次
                if (intervalId) clearInterval(intervalId); // 清除旧的定时器（如果存在）
                intervalId = setInterval(updateDisplayTime, 1000); // 每 1000ms (1秒) 更新一次时间
            });
    }

    // --- 页面加载完成后，开始获取时间 ---
    fetchAccurateTime();

});

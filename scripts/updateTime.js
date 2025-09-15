// --- 页面加载完成后执行所有脚本 ---
document.addEventListener('DOMContentLoaded', function() {

    // --- 更新时间和日期 (UTC 和 北京时间) ---
    const utcTimeElement = document.getElementById('utc-time'); // 需要在 HTML 中添加 <span id="utc-time"></span>
    const beijingTimeElement = document.getElementById('beijing-time'); // 需要在 HTML 中添加 <span id="beijing-time"></span>

    let timeOffset = 0; // 客户端时间与真实 UTC 时间的毫秒差
    let apiFetchAttempted = false; // 标记是否已尝试获取 API 时间
    let intervalId = null; // 用于存储 setInterval 的 ID，方便后续清除（如果需要）
    let isTimeCalibrated = false; // 标记时间是否已校准

    // Retry function with exponential backoff - 减少重试次数和延迟
    async function retryWithBackoff(fn, maxRetries = 2, delay = 500) {
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await fn();
        } catch (error) {
          if (i === maxRetries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
      }
    }

    // Fetch with timeout - 减少超时时间以加快响应
    async function fetchWithTimeout(url, options = {}, timeout = 3000) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    }

    // JSONP request function for CORS bypass - 减少超时时间
    function fetchWithJSONP(url, timeout = 3000) {
      return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_callback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const script = document.createElement('script');
        const timeoutId = setTimeout(() => {
          cleanup();
          reject(new Error('JSONP request timeout'));
        }, timeout);

        function cleanup() {
          clearTimeout(timeoutId);
          delete window[callbackName];
          document.head.removeChild(script);
        }

        window[callbackName] = function(data) {
          cleanup();
          resolve(data);
        };

        script.onerror = function() {
          cleanup();
          reject(new Error('JSONP request failed'));
        };

        script.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + callbackName;
        document.head.appendChild(script);
      });
    }

    // Get accurate time with simplified fast APIs
    async function getAccurateTimeWithFallback() {
      const timeApis = [
        // 只保留最快最可靠的API
        async () => {
          const response = await fetchWithTimeout('https://worldtimeapi.org/api/timezone/Etc/UTC');
          if (!response.ok) throw new Error('WorldTimeAPI 失败');
          const data = await response.json();
          return data.unixtime * 1000; // Convert to milliseconds
        },
        async () => {
          const response = await fetchWithTimeout('https://timeapi.io/api/Time/current/zone?timeZone=UTC');
          if (!response.ok) throw new Error('TimeAPI.io 失败');
          const data = await response.json();
          return new Date(data.dateTime).getTime();
        }
      ];

      for (const api of timeApis) {
        try {
          const accurateTime = await retryWithBackoff(api);
          console.log(`成功获取准确时间，API: ${timeApis.indexOf(api)}`);
          return accurateTime;
        } catch (error) {
          console.warn(`时间API失败，尝试下一个:`, error.message);
          continue;
        }
      }
      
      // 如果API都失败了，直接使用客户端时间
      console.warn('所有时间API都失败，使用客户端时间');
      return Date.now();
    }

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
    async function fetchAccurateTime() {
        if (!utcTimeElement || !beijingTimeElement) return; // 如果没有显示元素，则不尝试获取

        try {
            const accurateUtcTimestamp = await getAccurateTimeWithFallback();
            const clientTimestampAtFetch = Date.now(); // 获取 API 响应时的客户端时间戳
            // 计算客户端时钟与真实 UTC 的偏差
            // timeOffset = 真实UTC时间戳 - 客户端时间戳
            // 如果客户端快了，offset 为负；如果客户端慢了，offset 为正。
            timeOffset = accurateUtcTimestamp - clientTimestampAtFetch;
            console.log(`成功获取时间，计算出的客户端时间偏差: ${timeOffset}ms`);
            apiFetchAttempted = true; // 标记已尝试且成功
            isTimeCalibrated = true; // 标记时间已校准
        } catch (error) {
            console.warn(`无法获取准确时间: ${error.message}. 将回退使用客户端本地时间。`);
            timeOffset = 0; // 获取失败，不进行校准
            apiFetchAttempted = true; // 标记已尝试但失败
        } finally {
            // 无论成功或失败，都立即更新一次时间显示
            updateDisplayTime();
            // 定时器已经在开始时设置，这里不需要重复设置
        }
    }

    // 立即显示本地时间，不等待API校准
    updateDisplayTime();
    // 立即开始每秒更新时间
    intervalId = setInterval(updateDisplayTime, 1000);
    
    // 在后台异步校准时间，不阻塞界面显示
    setTimeout(() => {
        fetchAccurateTime();
    }, 100); // 延迟100ms开始校准，确保界面先显示

});
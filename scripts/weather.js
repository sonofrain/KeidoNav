// Weather functionality using Open-Meteo API

// Translate city names to Chinese
function translateCityName(englishName) {
  const cityTranslations = {
    // Major Chinese cities
    Beijing: "北京",
    Shanghai: "上海",
    Guangzhou: "广州",
    Shenzhen: "深圳",
    Chengdu: "成都",
    Hangzhou: "杭州",
    Wuhan: "武汉",
    "Xi'an": "西安",
    Nanjing: "南京",
    Chongqing: "重庆",
    Tianjin: "天津",
    Suzhou: "苏州",
    Harbin: "哈尔滨",
    Shenyang: "沈阳",
    Dalian: "大连",
    Qingdao: "青岛",
    Jinan: "济南",
    Zhengzhou: "郑州",
    Changsha: "长沙",
    Ningbo: "宁波",
    Xiamen: "厦门",
    Fuzhou: "福州",
    Hefei: "合肥",
    Kunming: "昆明",
    Nanning: "南宁",
    Haikou: "海口",
    Sanya: "三亚",
    Lhasa: "拉萨",
    Urumqi: "乌鲁木齐",
    Taipei: "台北",
    Kaohsiung: "高雄",
    Taichung: "台中",
    Tainan: "台南",
    "Hong Kong": "香港",
    Macau: "澳门",

    // International cities
    "New York": "纽约",
    London: "伦敦",
    Paris: "巴黎",
    Tokyo: "东京",
    Singapore: "新加坡",
    Seoul: "首尔",
    Sydney: "悉尼",
    Moscow: "莫斯科",
    Dubai: "迪拜",
    Toronto: "多伦多",
    "Los Angeles": "洛杉矶",
    Chicago: "芝加哥",
    Houston: "休斯顿",
    Phoenix: "菲尼克斯",
    Philadelphia: "费城",
    "San Antonio": "圣安东尼奥",
    "San Diego": "圣地亚哥",
    Dallas: "达拉斯",
    "San Jose": "圣何塞",
    Austin: "奥斯汀",
    Jacksonville: "杰克逊维尔",
    "Fort Worth": "沃斯堡",
    Columbus: "哥伦布",
    Charlotte: "夏洛特",
    "San Francisco": "旧金山",
    Indianapolis: "印第安纳波利斯",
    Seattle: "西雅图",
    Denver: "丹佛",
    Boston: "波士顿",
    Washington: "华盛顿",
    Nashville: "纳什维尔",
    Baltimore: "巴尔的摩",
    "Oklahoma City": "俄克拉荷马城",
    "Las Vegas": "拉斯维加斯",
    Milwaukee: "密尔沃基",
    Portland: "波特兰",
    Albuquerque: "阿尔伯克基",
    Tucson: "图森",
    Fresno: "弗雷斯诺",
    Mesa: "梅萨",
    Sacramento: "萨克拉门托",
    Atlanta: "亚特兰大",
    Miami: "迈阿密",
    Orlando: "奥兰多",
    Tampa: "坦帕",
    Minneapolis: "明尼阿波利斯",
    Cleveland: "克利夫兰",
    "New Orleans": "新奥尔良",
    Raleigh: "罗利",
    Cincinnati: "辛辛那提",
    "St. Louis": "圣路易斯",
    "Kansas City": "堪萨斯城",
    Anaheim: "阿纳海姆",
    Buffalo: "布法罗",
    Aurora: "奥罗拉",
    Riverside: "里弗赛德",
    Corona: "科罗娜",
    Pittsburgh: "匹兹堡",
    Lexington: "列克星敦",
    Anchorage: "安克雷奇",
    Stockton: "斯托克顿",
    Cincinnati: "辛辛那提",
    "St. Paul": "圣保罗",
    Toledo: "托莱多",
    Newark: "纽瓦克",
    Greensboro: "格林斯伯勒",
    Plano: "普莱诺",
    Henderson: "亨德森",
    Lincoln: "林肯",
    Buffalo: "布法罗",
    "Jersey City": "泽西城",
    "Chula Vista": "丘拉维斯塔",
    Orlando: "奥兰多",
    "St. Petersburg": "圣彼得堡",
    Norfolk: "诺福克",
    Chandler: "钱德勒",
    Laredo: "拉雷多",
    Madison: "麦迪逊",
    "Winston-Salem": "温斯顿-塞勒姆",
    Lubbock: "拉伯克",
    Garland: "加兰",
    Glendale: "格伦代尔",
    Hialeah: "海厄利亚",
    Reno: "里诺",
    "Baton Rouge": "巴吞鲁日",
    Akron: "阿克伦",
    Irving: "欧文",
    Scottsdale: "斯科茨代尔",
    Rochester: "罗切斯特",
    Spokane: "斯波坎",
    "Port St. Lucie": "圣露西港",
    Boise: "博伊西",
    Fremont: "弗里蒙特",
    Tallahassee: "塔拉哈西",
    Richmond: "里士满",
    Yonkers: "扬克斯",
    Birmingham: "伯明翰",
    Arlington: "阿灵顿",
    "Newport News": "纽波特纽斯",
    Beaumont: "博蒙特",
    Hampton: "汉普顿",
    Alexandria: "亚历山大",
    Hartford: "哈特福德",
    Lakewood: "莱克伍德",
    Vancouver: "温哥华",
    Montreal: "蒙特利尔",
    Calgary: "卡尔加里",
    Edmonton: "埃德蒙顿",
    Ottawa: "渥太华",
    "Quebec City": "魁北克市",
    Winnipeg: "温尼伯",
    Victoria: "维多利亚",
    Berlin: "柏林",
    Hamburg: "汉堡",
    Munich: "慕尼黑",
    Cologne: "科隆",
    Frankfurt: "法兰克福",
    Stuttgart: "斯图加特",
    Dusseldorf: "杜塞尔多夫",
    Dortmund: "多特蒙德",
    Essen: "埃森",
    Leipzig: "莱比锡",
    Bremen: "不来梅",
    Hannover: "汉诺威",
    Nuremberg: "纽伦堡",
    Dresden: "德累斯顿",
    Bonn: "波恩",
    Bochum: "波鸿",
    Bielefeld: "比勒费尔德",
    Mannheim: "曼海姆",
    Wiesbaden: "威斯巴登",
    Munster: "明斯特",
    Augsburg: "奥格斯堡",
    Aachen: "亚琛",
    Mönchengladbach: "门兴格拉德巴赫",
    Gelsenkirchen: "盖尔森基兴",
    Braunschweig: "不伦瑞克",
    Chemnitz: "开姆尼茨",
    Kiel: "基尔",
    Krefeld: "克雷菲尔德",
    Halle: "哈勒",
    Magdeburg: "马格德堡",
    Freiburg: "弗莱堡",
    Oberhausen: "奥伯豪森",
    Lubeck: "吕贝克",
    Erfurt: "埃尔福特",
    Rostock: "罗斯托克",
    Mainz: "美因茨",
    Kassel: "卡塞尔",
    Hagen: "哈根",
    Hamm: "哈姆",
    Saarbrücken: "萨尔布吕肯",
    Mülheim: "米尔海姆",
    Potsdam: "波茨坦",
    Ludwigshafen: "路德维希港",
    Oldenburg: "奥尔登堡",
    Leverkusen: "勒沃库森",
    Osnabrück: "奥斯纳布吕克",
    Solingen: "索林根",
    Heidelberg: "海德堡",
    Neuss: "诺伊斯",
    Darmstadt: "达姆施塔特",
    Paderborn: "帕德博恩",
    Regensburg: "雷根斯堡",
    Wuppertal: "伍珀塔尔",
    Würzburg: "维尔茨堡",
    Göttingen: "哥廷根",
    Bottrop: "博特罗普",
    Recklinghausen: "雷克林豪森",
    Wolfsburg: "沃尔夫斯堡",
    Fürth: "菲尔特",
    Erlangen: "埃尔朗根",
    Bremerhaven: "不来梅哈芬",
    Ulm: "乌尔姆",
    Heilbronn: "海尔布隆",
    Pforzheim: "普福尔茨海姆",
    Göttingen: "哥廷根",
    Bottrop: "博特罗普",
    Recklinghausen: "雷克林豪森",
    Wolfsburg: "沃尔夫斯堡",
    Fürth: "菲尔特",
    Erlangen: "埃尔朗根",
    Bremerhaven: "不来梅哈芬",
    Ulm: "乌尔姆",
    Heilbronn: "海尔布隆",
    Pforzheim: "普福尔茨海姆",
    Göttingen: "哥廷根",
    Bottrop: "博特罗普",
    Recklinghausen: "雷克林豪森",
    Wolfsburg: "沃尔夫斯堡",
    Fürth: "菲尔特",
    Erlangen: "埃尔朗根",
    Bremerhaven: "不来梅哈芬",
    Ulm: "乌尔姆",
    Heilbronn: "海尔布隆",
    Pforzheim: "普福尔茨海姆",
  };

  return cityTranslations[englishName] || englishName;
}

// Get user's location and fetch weather data
async function getWeatherInfo() {
  try {
    // First get user's location using IP geolocation
    const locationResponse = await fetch("https://ipapi.co/json/");
    const locationData = await locationResponse.json();

    const latitude = locationData.latitude;
    const longitude = locationData.longitude;
    let city = locationData.city || locationData.region || "未知位置";

    // Translate city name to Chinese
    city = translateCityName(city);

    // Fetch weather data from Open-Meteo API
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error("天气数据获取失败");
    }

    const weatherData = await weatherResponse.json();

    // Extract current weather information
    const currentWeather = weatherData.current;
    const currentTemp = Math.round(currentWeather.temperature_2m);
    const feelsLike = Math.round(currentWeather.apparent_temperature);
    const humidity = currentWeather.relative_humidity_2m;
    const windSpeed = Math.round(currentWeather.wind_speed_10m);
    const weatherCode = currentWeather.weather_code;

    // Get weather description based on WMO weather code
    const weatherDescription = getWeatherDescription(
      weatherCode,
      currentWeather.is_day
    );

    // Update weather bar with comprehensive information
    const weatherElement = document.getElementById("weather-info");
    if (weatherElement) {
      weatherElement.innerHTML = `
        <span>${city}</span>
        <span> | </span>
        <span>${weatherDescription}</span>
        <span> | </span>
        <span>${currentTemp}°C</span>
        <span> (体感 ${feelsLike}°C)</span>
        <span> | </span>
        <span>湿度 ${humidity}%</span>
        <span> | </span>
        <span>风速 ${windSpeed} km/h</span>
      `;

      // Show weather container after loading
      const weatherContainer = document.getElementById("weather-container");
      if (weatherContainer) {
        weatherContainer.style.display = "flex";
      }
    }

    // Store weather data for potential future use
    window.currentWeatherData = {
      city,
      current: currentWeather,
      hourly: weatherData.hourly,
      daily: weatherData.daily,
      description: weatherDescription,
    };
  } catch (error) {
    console.error("获取天气信息失败:", error);

    // If API call fails, display default information
    const weatherElement = document.getElementById("weather-info");
    if (weatherElement) {
      weatherElement.textContent = "天气信息不可用";
    }

    // Show weather container even if there's an error
    const weatherContainer = document.getElementById("weather-container");
    if (weatherContainer) {
      weatherContainer.style.display = "flex";
    }
  }
}

// Convert WMO weather code to description
function getWeatherDescription(code, isDay = 1) {
  const weatherCodes = {
    0: isDay ? "晴朗" : "晴朗",
    1: isDay ? "少云" : "少云",
    2: isDay ? "多云" : "多云",
    3: isDay ? "阴天" : "阴天",
    45: "雾",
    48: "雾凇",
    51: "毛毛雨",
    53: "毛毛雨",
    55: "毛毛雨",
    56: "冻毛毛雨",
    57: "冻毛毛雨",
    61: "小雨",
    63: "中雨",
    65: "大雨",
    66: "冻雨",
    67: "冻雨",
    71: "小雪",
    73: "中雪",
    75: "大雪",
    77: "雪粒",
    80: "小阵雨",
    81: "中阵雨",
    82: "大阵雨",
    85: "小阵雪",
    86: "大阵雪",
    95: "雷暴",
    96: "雷暴伴小冰雹",
    99: "雷暴伴大冰雹",
  };

  return weatherCodes[code] || "未知天气";
}

// Initialize weather when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  getWeatherInfo();

  // Update weather every 30 minutes
  setInterval(getWeatherInfo, 30 * 60 * 1000);
});

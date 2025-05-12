// image_list.js

// 确保这个变量是全局可访问的，或者在你的主脚本执行后可以访问到的作用域内。
// 在常规脚本（非模块）的顶层使用 'const' 实际上会使其成为全局变量（在浏览器中附加到 'window' 对象）。
const preloadedImageData = {
    computerImages: [
        "images/background/computer/129209039_p0.jpg"
        , "images/background/computer/__crewmate_and_cyan_original_and_1_more_drawn_by_redcxca__419f234110fe56ce9175f07946f0716e.jpg"
        , "images/background/computer/__lumine_mona_and_keqing_genshin_impact__0890a11a02e56b147078dd5cd2db3a9f.jpg"
        , "images/background/computer/__ro635_and_robella_girls_frontline_and_1_more__a00ab99cd4024a012e13138b8148453d.jpg"
        , "images/background/computer/__sangonomiya_kokomi_genshin_impact__1308dbbe9dd6f4fc8d98798701066693.jpg"
        , "images/background/computer/__ump45_m950a_saiga_12_ukm_2000_acr_and_11_more_girls_frontline_drawn_by_nunok__ddb240b88f739b5cecf3d29327a35c31.jpg"
        , "images/background/computer/__zani_wuthering_waves_drawn_by_jiusan_naitang__a21e7ef80a812d04bd30c645430c1c12.jpg"
        , "images/background/computer/104359432_p1.webp"
        , "images/background/computer/113959859_p0.webp"
        , "images/background/computer/115090703_p0.webp"
        , "images/background/computer/129206493_p0.webp"
        , "images/background/computer/71678057_p0.webp"
        , "images/background/computer/71953079_p0.webp"
        , "images/background/computer/74078288_p0.webp"
        , "images/background/computer/81116740_p0.webp"
        , "images/background/computer/85970602_p0.webp"
    ],
    mobileImages: [
        "images/background/mobile/__aventurine_and_topaz_honkai_and_1_more__483d4afa4c9b0501aab4fd4634ab4960.jpg"
        , "images/background/mobile/__ellen_joe_eous_and_sharkboo_zenless_zone_zero_drawn_by_makong6593__1ee858a4f8ec5a1cdbd3c913c861a202.jpg"
        , "images/background/mobile/__fujita_kotone_idolmaster_and_1_more_drawn_by_07nono06__c9089f777e9915ee507598adcaeef6b4.jpg"
        , "images/background/mobile/__herta_honkai_and_1_more__ea81981fc12d4301042a62fac1a1bfce.jpg"
        , "images/background/mobile/__ro635_and_robella_girls_frontline_and_1_more__342b4ee0370ffbcf27353bce56bafe33.jpg"
        , "images/background/mobile/__sangonomiya_kokomi_genshin_impact__88d5610f60d7084e38e3c08cc4a9e4c8.jpg"
        , "images/background/mobile/__silver_wolf_honkai_and_1_more__85e0ca59e72fd6852e2c152a4aa5c1f6.jpg"
        , "images/background/mobile/__topaz_trotter_numby_and_warp_trotter_honkai_and_1_more__4f2ab7074d519b215cd150b8cf1f433a.jpg"
        , "images/background/mobile/102892926_p0.webp"
        , "images/background/mobile/107034113_p0.webp"
        , "images/background/mobile/112402250_p0.webp"
        , "images/background/mobile/119516717_p0.webp"
        , "images/background/mobile/120609282_p0.webp"
        , "images/background/mobile/126669411_p0.webp"
        , "images/background/mobile/88316537_p0.webp"    ]
  };
  
  // 你也可以这样做：
  // window.preloadedImageData = { ... };
  // 来明确地使其成为全局变量，尽管在顶层使用 'const' 通常就足够了。
  
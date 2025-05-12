@ECHO OFF
SETLOCAL EnableDelayedExpansion

:: --- 确定脚本的绝对目录 ---
SET "SCRIPT_DIR=%~dp0"
SET "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"
:: --- 结束目录确定 ---

:: --- 配置 ---
SET "COMPUTER_DIR=%SCRIPT_DIR%\images\background\computer"
SET "MOBILE_DIR=%SCRIPT_DIR%\images\background\mobile"
SET "OUTPUT_DIR=%SCRIPT_DIR%\scripts"
SET "OUTPUT_JS=%OUTPUT_DIR%\image_list.js"

:: JS 中 URL 的基础路径（相对路径，使用正斜杠 /）
SET "COMPUTER_BASE_PATH=images/background/computer"
SET "MOBILE_BASE_PATH=images/background/mobile"
:: --- 结束配置 ---

ECHO 正在生成图片列表脚本: %OUTPUT_JS% ...

:: --- 检查并创建输出目录 ---
IF NOT EXIST "%OUTPUT_DIR%\" (
    ECHO 创建输出目录: %OUTPUT_DIR%
    MKDIR "%OUTPUT_DIR%"
    IF ERRORLEVEL 1 (
        ECHO ERROR: 无法创建目录 %OUTPUT_DIR%. 请检查权限。 >&2
        GOTO :EOF
    )
)

:: --- 使用单个重定向块生成 JS 文件 ---
(
  ECHO const preloadedImageData = {
  ECHO   computerImages:
  CALL :generate_js_array "%COMPUTER_DIR%" "%COMPUTER_BASE_PATH%"
  ECHO   ,
  ECHO   mobileImages:
  CALL :generate_js_array "%MOBILE_DIR%" "%MOBILE_BASE_PATH%"
  ECHO };
) > "%OUTPUT_JS%"
:: --- 结束 JS 生成 ---

:: 检查文件是否成功创建
IF EXIST "%OUTPUT_JS%" (
    ECHO 成功生成 %OUTPUT_JS%
    ECHO 请记得在添加或删除图片后重新运行此脚本。
) ELSE (
    REM 如果文件未创建，向错误流输出消息
    ECHO ERROR: 未能生成 %OUTPUT_JS%. 请检查脚本权限或路径配置。 >&2
)

ENDLOCAL
EXIT /B 0

:: ============================================================================
:: 子程序：查找图片并将其格式化为 JS 数组字符串
:: 参数: %1=要扫描的目录 (绝对路径), %2=基础 Web 路径 (相对路径)
:: 输出: 将 JS 数组内容（例如 [ "path1", "path2" ]）打印到标准输出
:: ============================================================================
:generate_js_array
SETLOCAL EnableDelayedExpansion
SET "DIR_TO_SCAN=%~1"
SET "BASE_WEB_PATH=%~2"

:: 检查目录是否存在
IF NOT EXIST "%DIR_TO_SCAN%\" (
    ECHO []
    REM 向标准错误输出警告信息，不会进入 JS 文件
    ECHO Warning: Directory not found: %DIR_TO_SCAN% >&2
    ENDLOCAL
    GOTO :EOF
)

ECHO [
SET "NEEDS_COMMA=0" :: 标记，0表示不需要逗号（第一个元素），1表示需要

:: 循环查找支持的图片文件
FOR %%F IN (
    "%DIR_TO_SCAN%\*.jpg"
    "%DIR_TO_SCAN%\*.jpeg"
    "%DIR_TO_SCAN%\*.png"
    "%DIR_TO_SCAN%\*.gif"
    "%DIR_TO_SCAN%\*.webp"
    "%DIR_TO_SCAN%\*.avif"
    "%DIR_TO_SCAN%\*.jfif"
) DO (
    SET "FILENAME=%%~nxF"
    :: 构建相对 Web 路径 (确保使用正斜杠)
    SET "WEB_PATH=%BASE_WEB_PATH%/!FILENAME!"

    IF "!NEEDS_COMMA!"=="1" (
        :: 如果不是第一个元素，先输出逗号和换行/缩进
        ECHO     , "!WEB_PATH!"
    ) ELSE (
        :: 如果是第一个元素，直接输出（无前导逗号）
        ECHO     "!WEB_PATH!"
        SET "NEEDS_COMMA=1" :: 设置标记，表示下一个元素需要逗号
    )
)
ECHO   ]

ENDLOCAL
GOTO :EOF
:: ============================================================================

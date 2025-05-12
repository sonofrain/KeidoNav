@ECHO OFF
SETLOCAL EnableDelayedExpansion

:: --- 确定脚本的绝对目录 ---
SET "SCRIPT_DIR=%~dp0"
SET "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"
:: --- 结束目录确定 ---

:: --- 配置 ---
SET "COMPUTER_DIR=%SCRIPT_DIR%\images\background\computer"
SET "MOBILE_DIR=%SCRIPT_DIR%\images\background\mobile"
SET "OUTPUT_JSON=%SCRIPT_DIR%\image_list.json"

:: JSON 中 URL 的基础路径（相对路径，使用正斜杠 /）
SET "COMPUTER_BASE_PATH=images/background/computer"
SET "MOBILE_BASE_PATH=images/background/mobile"
:: --- 结束配置 ---

ECHO 正在生成图片列表: %OUTPUT_JSON% ...

:: --- 使用单个重定向块生成 JSON 文件 ---
(
  ECHO {
  ECHO   "computerImages":
  CALL :generate_json_array "%COMPUTER_DIR%" "%COMPUTER_BASE_PATH%"
  ECHO   ,
  ECHO   "mobileImages":
  CALL :generate_json_array "%MOBILE_DIR%" "%MOBILE_BASE_PATH%"
  ECHO }
) > "%OUTPUT_JSON%"
:: --- 结束 JSON 生成 ---

:: 检查文件是否成功创建
IF EXIST "%OUTPUT_JSON%" (
    ECHO 成功生成 %OUTPUT_JSON%
    ECHO 请记得在添加或删除图片后重新运行此脚本。
) ELSE (
    REM 如果文件未创建，向错误流输出消息
    ECHO ERROR: 未能生成 %OUTPUT_JSON%. 请检查脚本权限或路径配置。 >&2
)

ENDLOCAL
EXIT /B 0

:: ============================================================================
:: 子程序：查找图片并将其格式化为 JSON 数组
:: 参数: %1=要扫描的目录 (绝对路径), %2=基础 Web 路径 (相对路径)
:: 输出: 将 JSON 数组内容（例如 [ "path1", "path2" ]）打印到标准输出
:: ============================================================================
:generate_json_array
SETLOCAL EnableDelayedExpansion
SET "DIR_TO_SCAN=%~1"
SET "BASE_WEB_PATH=%~2"

:: 检查目录是否存在
IF NOT EXIST "%DIR_TO_SCAN%\" (
    ECHO []
    REM 向标准错误输出警告信息，不会进入 JSON 文件
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
    :: 构建相对 Web 路径
    SET "WEB_PATH=%BASE_WEB_PATH%/!FILENAME!"

    IF "!NEEDS_COMMA!"=="1" (
        :: 如果不是第一个元素，先输出逗号和换行/缩进
        ECHO   , "!WEB_PATH!"
    ) ELSE (
        :: 如果是第一个元素，直接输出（无前导逗号）
        ECHO   "!WEB_PATH!"
        SET "NEEDS_COMMA=1" :: 设置标记，表示下一个元素需要逗号
    )
)
ECHO ]

ENDLOCAL
GOTO :EOF
:: ============================================================================

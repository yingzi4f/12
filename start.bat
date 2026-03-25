@echo off
chcp 65001 >nul
title 航班分析系统 - 启动脚本
echo =========================================
echo   基于Hadoop的航班分析系统 - 启动脚本
echo =========================================
echo.

REM 检查 MySQL 服务
echo [1/5] 检查 MySQL 服务...
sc query MySQL80 2>nul | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo MySQL 未运行，正在启动...
    net start MySQL80 2>nul
    if %errorlevel% neq 0 (
        echo ✗ 无法启动 MySQL，请手动启动
        echo   可以使用: net start MySQL80
        pause
        exit /b 1
    )
    timeout /t 3 /nobreak >nul
) else (
    echo ✓ MySQL 已运行
)

REM 进入项目目录
set PROJECT_DIR=%~dp0
cd /d "%PROJECT_DIR%"

REM 检查端口占用
echo.
echo [2/5] 检查端口占用情况...

REM 检查 5000 端口
netstat -ano | findstr ":5000.*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✗ 端口 5000 已被占用，请先关闭后端服务
    echo   可以运行 stop.bat 来停止所有服务
    pause
    exit /b 1
) else (
    echo ✓ 端口 5000 可用
)

REM 检查 8080 端口
netstat -ano | findstr ":8080.*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✗ 端口 8080 已被占用，请先关闭前端用户端
    pause
    exit /b 1
) else (
    echo ✓ 端口 8080 可用
)

REM 检查 8081 端口
netstat -ano | findstr ":8081.*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✗ 端口 8081 已被占用，请先关闭后台管理系统
    pause
    exit /b 1
) else (
    echo ✓ 端口 8081 可用
)

REM 启动后端服务
echo.
echo [3/5] 启动后端服务...
cd "%PROJECT_DIR%\server"
start "航班分析系统-后端" cmd /k "echo 正在启动后端服务... && mvn spring-boot:run"
echo ✓ 后端服务已启动

REM 等待后端启动
echo.
echo    等待后端服务启动...
timeout /t 15 /nobreak >nul

REM 启动前端用户端
echo.
echo [4/5] 启动前端用户端...
cd "%PROJECT_DIR%\vue\client_home"
if not exist "node_modules" (
    echo 首次启动，正在安装依赖...
    call npm install
)
set NODE_OPTIONS=--openssl-legacy-provider
start "航班分析系统-用户端" cmd /k "echo 正在启动前端用户端... && npm run serve"
echo ✓ 前端用户端已启动

REM 启动后台管理系统
echo.
echo [5/5] 启动后台管理系统...
cd "%PROJECT_DIR%\vue\client_admin"
if not exist "node_modules" (
    echo 首次启动，正在安装依赖...
    call npm install
)
set NODE_OPTIONS=--openssl-legacy-provider
start "航班分析系统-后台管理" cmd /k "echo 正在启动后台管理系统... && npm run serve"
echo ✓ 后台管理系统已启动

echo.
echo =========================================
echo   所有服务已启动！
echo =========================================
echo.
echo 📱 访问地址：
echo    - 前端用户端: http://localhost:8080
echo    - 后台管理端: http://localhost:8081
echo    - 后端 API:   http://localhost:5000/api
echo.
echo 📝 默认账号：
echo    - 管理员账号: admin / admin
echo.
echo 🛑 停止服务：
echo    双击 stop.bat
echo.
echo ⏳ 等待前端编译完成（首次启动需要 2-3 分钟）...
echo    可以在打开的窗口中查看编译进度
echo.

REM 等待一下让服务完全启动
timeout /t 5 /nobreak >nul

REM 尝试测试后端
echo 测试后端服务连接...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5000/api' -TimeoutSec 5; Write-Host '✓ 后端服务运行正常' } catch { Write-Host '⚠ 后端服务可能未成功启动，请查看后端窗口' }"

echo.
echo 完成！现在可以访问系统了。
echo.
pause

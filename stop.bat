@echo off
chcp 65001 >nul
title 航班分析系统 - 停止脚本
echo =========================================
echo   停止航班分析系统所有服务
echo =========================================
echo.

echo 正在停止服务...

REM 通过端口查找并关闭进程
set KILLED=0

echo.
echo 停止后端服务（端口 5000）...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":5000.*LISTENING"') do (
    echo   停止进程 PID: %%a
    taskkill /F /PID %%a >nul 2>&1
    set /a KILLED+=1
)
if %KILLED% equ 0 (
    echo   ✓ 后端服务未运行
) else (
    echo   ✓ 后端服务已停止
)

set KILLED=0
echo.
echo 停止前端用户端（端口 8080）...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":8080.*LISTENING"') do (
    echo   停止进程 PID: %%a
    taskkill /F /PID %%a >nul 2>&1
    set /a KILLED+=1
)
if %KILLED% equ 0 (
    echo   ✓ 前端用户端未运行
) else (
    echo   ✓ 前端用户端已停止
)

set KILLED=0
echo.
echo 停止后台管理系统（端口 8081）...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":8081.*LISTENING"') do (
    echo   停止进程 PID: %%a
    taskkill /F /PID %%a >nul 2>&1
    set /a KILLED+=1
)
if %KILLED% equ 0 (
    echo   ✓ 后台管理系统未运行
) else (
    echo   ✓ 后台管理系统已停止
)

REM 额外清理：关闭可能残留的 node 进程
echo.
echo 清理 Node.js 进程...
tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /v "0" >nul
if %errorlevel% equ 0 (
    taskkill /F /IM node.exe >nul 2>&1
    echo   ✓ 已清理 Node.js 进程
) else (
    echo   ✓ 无残留 Node.js 进程
)

REM 等待进程完全结束
timeout /t 2 /nobreak >nul

echo.
echo =========================================
echo   所有服务已停止
echo =========================================
echo.
echo 您可以重新运行 start.bat 启动服务
echo.
pause

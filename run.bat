@echo off
title Portfolio + Admin Studio
color 0B

echo ===================================================
echo   Starting Personal Portfolio + Admin Dashboard
echo ===================================================
echo.

:: Change directory to current script location
cd /d "%~dp0"

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not found on your system!
    echo Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Free ports 7000 and 7001 if occupied by previous runs
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":7000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>nul
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":7001" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>nul
)

:: Check if dependencies are installed
if not exist "node_modules\" (
    echo [INFO] Dependencies not found. Installing now...
    call npm run install:all
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
)

:: Launch browser after 2 seconds
start /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:7000"

echo [INFO] Opening browser at http://localhost:7000
echo [INFO] Admin Dashboard available at http://localhost:7000/x7k9-admin
echo.
echo Press Ctrl+C at any time in this window to stop the servers.
echo ===================================================
echo.

:: Start concurrently dev servers
npm run dev

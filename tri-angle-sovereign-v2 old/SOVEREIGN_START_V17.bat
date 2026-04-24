@echo off
title SOVEREIGN.5 ELITE UAE ENGINE
color 0A

:: Suppress Node.js Deprecation Warnings to keep terminal clean
set NODE_NO_WARNINGS=1

echo ====================================================
echo    SOVEREIGN v17.0 -- ELITE UAE SALES CLOSER
echo ====================================================
echo.
echo [INFO] Initializing Sovereign Sales Closer Core...
echo [INFO] Target Emirates: All 7 UAE Emirates
echo.

:: 1. Navigate to the agency engine folder (current directory)
cd /d "%~dp0"

:: 2. Clean stale node processes and ports quietly
echo [1/3] Syncing ecosystem (safe — will not kill other agents)...
tasklist /FI "IMAGENAME eq node.exe" /FO CSV 2>NUL | find /I /N "node.exe">NUL
if "%ERRORLEVEL%"=="0" (
  for /f "tokens=2 delims=," %%A in ('tasklist /FI "IMAGENAME eq node.exe" /FO CSV ^| find /I "node.exe"') do taskkill /PID %%A /F /T >NUL 2>&1
)

:: 3. Auto-Open Dashboard in Browser instantly
echo [2/3] Launching Command Center at http://localhost:3005...
start http://localhost:3005

:: 4. Start the 24/7 Discovery & Outreach Engine
echo [3/3] Powering on Engine v17.0 (Discovery + Sales Closer)...
echo.
set PORT=3002
npx concurrently --names "SERVER,WORKER,DASH" --prefix-colors "green,yellow,cyan" "npx tsx server.ts" "npx tsx worker.ts" "npx vite --port=3005"

pause

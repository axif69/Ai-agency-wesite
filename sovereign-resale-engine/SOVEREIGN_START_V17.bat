@echo off
title [RESALE V5] SOVEREIGN ENGINE
color 0B

:: Suppress Node.js Deprecation Warnings to keep terminal clean
set NODE_NO_WARNINGS=1

:: v21.40: Emergency Cleanup
if exist public\api_port.json del public\api_port.json

echo ====================================================
echo    SOVEREIGN v5.1 -- [ELITE RESALE EDITION]
echo ====================================================
echo.
echo [INFO] Agent Location: %~dp0
echo [INFO] Database: sovereign_resale_v5.db
echo.

:: 1. Navigate to folder
cd /d "%~dp0"

:: 2. Auto-Open Dashboard in Browser (Port 3006) instantly
echo [1/2] Launching Command Center at http://localhost:3006...
start http://localhost:3006

:: 3. Start Processes (Syncing Discovery + Backend + Frontend)
echo [2/2] Igniting v5.1 Resale Engine Ecosystem...
echo.
set PORT=3003
npx concurrently --names "SERVER,WORKER,DASH" --prefix-colors "green,yellow,cyan" "npx tsx server.ts" "npx tsx worker.ts" "npx vite --port=3006"

pause

@echo off
title [V2 CORE] SOVEREIGN ENGINE
color 0A
:: v21.40: Emergency Cleanup
if exist public\api_port.json del public\api_port.json
echo ====================================================
echo    SOVEREIGN v17.0 -- [V2 CORE EDITION]
echo ====================================================
echo.
echo [INFO] Agent Location: %~dp0
echo [INFO] Isolated Database: sovereign_v2_core.db
echo.

:: 1. Navigate to folder
cd /d "%~dp0"

:: 2. Auto-Open Dashboard in Browser (Port 3005)
echo [1/2] Launching Command Center at http://localhost:3005...
start http://localhost:3005

:: 3. Start Processes (Syncing Discovery + Backend + Frontend)
echo [2/2] Igniting v17.0 Core Engine Ecosystem...
echo.
npx concurrently --names "SERVER,WORKER,DASH" --prefix-colors "green,yellow,cyan" "npx tsx server.ts" "npx tsx worker.ts" "npx vite --port=3005"

pause

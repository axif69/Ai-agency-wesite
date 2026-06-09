@echo off
echo --- GM Events Global Sniper: Initializing MAS Workforce ---
echo.
echo [1/3] Launching Independent Agent Terminals...
echo [2/3] Starting Command Center Backend...
echo [3/3] Deploying Dashboard UI...
echo.

:: Start the multi-process manager, server, and frontend in one go
start cmd /k "npm run dev:all"

echo.
echo Waiting 8 seconds for system stabilization...
timeout /t 8 > nul

echo.
echo [COMPLETE] Launching Dashboard in Chrome...
start chrome "http://localhost:5173"

echo.
echo Mission Active. Monitor the independent terminals for live OSINT logs.
pause

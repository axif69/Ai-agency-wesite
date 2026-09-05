@echo off
TITLE SOVEREIGN ENGINE - MANAGED SERVICES
COLOR 0A
cls
echo =======================================================================
echo    ASIF DIGITAL AGENCY - SOVEREIGN SALES ENGINE V5.1 MULTI-LAUNCHER
echo =======================================================================
echo.
echo Starting the API and seven monitored workers in this window.
echo.

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
    echo Node.js is missing. Install the supported Node.js runtime first.
    pause
    exit /b 1
)
if not exist "node_modules\tsx\dist\loader.mjs" (
    echo Dependencies are missing. Restore project dependencies first.
    pause
    exit /b 1
)
echo Dashboard: http://localhost:3010
echo Failed workers retry automatically. Ctrl+C stops the managed suite.
node server/runtime_supervisor.mjs
pause

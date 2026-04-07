@echo off
SETLOCAL EnableExtensions
title Sovereign Sales Engine - By Asif Khan

echo =======================================================
echo    SOVEREIGN B2B SALES ENGINE - PORTABLE EDITION
echo    Building Business Intelligence... By Asif Khan
echo =======================================================
echo.
echo [1/3] Checking Node.js Environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install it from https://nodejs.org
    pause
    exit /b
)

echo [2/3] Initializing Neural Network (Installing dependencies)...
call npm install --no-audit --no-fund

echo [3/3] Launching Multi-Instance Engine...
echo.
echo *******************************************************
echo   SUCCESS: Engine is searching for available ports...
echo   The Dashboard will open automatically once ready.
echo   Check the console below for your unique URL.
echo *******************************************************
echo.

npm run dev

pause

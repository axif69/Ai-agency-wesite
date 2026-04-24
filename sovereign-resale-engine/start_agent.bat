@echo off
title SOVEREIGN v5.1 -- [ELITE RESALE EDITION]
cls
echo ====================================================
echo    SOVEREIGN v5.1 -- [ELITE RESALE EDITION]
echo ====================================================
echo.
echo [INFO] Agent Location: %~dp0
echo [INFO] Isolated Database: sovereign_v5.db
echo.
echo [1/2] Launching Command Center at http://localhost:3006...
echo [2/2] Igniting v5.1 Resale Engine Ecosystem...
echo.

:: Start the Concurrent Dev Server (Dashboard + Backend)
:: We locked the port to 3006 in vite.config.ts
start cmd /k "npm run dev"

:: Wait for Vite to warm up (Port 3006)
timeout /t 6 /nobreak > nul

:: Open Chrome directly to the Dashboard
echo [READY] Opening Chrome at Port 3006...
start chrome "http://localhost:3006"

echo.
echo ====================================================
echo    ENGINE ACTIVE -- MONITOR TERMINAL FOR TRACE
echo ====================================================

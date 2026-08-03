@echo off
TITLE ASIF DIGITAL AGENCY - SOVEREIGN SALES ENGINE V5.1 MULTI-WORKER LAUNCHER
COLOR 0A
cls
echo =======================================================================
echo    ASIF DIGITAL AGENCY - SOVEREIGN SALES ENGINE V5.1 MULTI-LAUNCHER
echo =======================================================================
echo.
echo Launching 6 Autonomous AI Workers + Express API Server in dedicated windows...
echo.

cd /d "%~dp0"

start "API SERVER (Port 3010)" cmd /k "title [1/6] API SERVER && color 0A && npx tsx server.ts"
timeout /t 3 /nobreak >nul

start "DISCOVERY WORKER" cmd /k "title [2/6] DISCOVERY WORKER && color 0B && npx tsx workers/discovery_worker.ts"
timeout /t 1 /nobreak >nul

start "ENRICHMENT WORKER" cmd /k "title [3/6] ENRICHMENT WORKER && color 0E && npx tsx workers/enrichment_worker.ts"
timeout /t 1 /nobreak >nul

start "LINKEDIN WORKER" cmd /k "title [4/6] LINKEDIN WORKER && color 0D && npx tsx workers/linkedin_worker.ts"
timeout /t 1 /nobreak >nul

start "AI DRAFTING WORKER" cmd /k "title [5/6] AI DRAFTING WORKER && color 0C && npx tsx workers/drafts_worker.ts"
timeout /t 1 /nobreak >nul

start "OUTREACH WORKER" cmd /k "title [6/6] OUTREACH WORKER && color 0F && npx tsx workers/outreach_worker.ts"

timeout /t 4 /nobreak >nul
start http://localhost:3010

echo.
echo =======================================================================
echo    ALL 6 AI ENGINE WORKERS & SERVICES HAVE BEEN LAUNCHED!
echo =======================================================================
echo.
echo Dashboard URL: http://localhost:3010
echo.
pause

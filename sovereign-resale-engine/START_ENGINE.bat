@echo off
title ASIF DIGITAL AGENCY - SOVEREIGN SALES ENGINE
color 0A
echo ============================================================
echo   ASIF DIGITAL AGENCY - SOVEREIGN SALES ENGINE V5.1
echo ============================================================
echo   Starting local AI Engine and opening Chrome UI...
echo ============================================================
echo.

start "" "http://localhost:3006"

REM `npm run dev` already launches all five workers via concurrently; tell the
REM server NOT to spawn a second copy of each worker (double-spawn = duplicate
REM polling, duplicate draft rows, and duplicate outreach sends).
set NO_AUTO_SPAWN=1

npm run dev
pause

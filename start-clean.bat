@echo off
echo ========================================
echo  Starting HSMart (Clean Start)
echo ========================================
echo.

echo [1/2] Killing processes on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [2/2] Waiting 2 seconds...
timeout /t 2 /nobreak >nul

echo Starting frontend application...
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop
echo.

call npm run dev


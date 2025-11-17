@echo off
echo ========================================
echo  Starting HSMart Application
echo ========================================
echo.

echo [1/2] Checking and freeing port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Killing process on port 3000 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

echo [2/2] Waiting 2 seconds...
timeout /t 2 /nobreak >nul

echo Starting frontend (React)...
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop the application
echo.

call npm run dev

pause


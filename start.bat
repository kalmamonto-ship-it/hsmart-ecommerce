@echo off
echo ========================================
echo  Starting HSMart Application
echo ========================================
echo.

echo [1/3] Checking and freeing ports...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process on port 5000 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Killing process on port 3000 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

echo [2/3] Waiting 2 seconds...
timeout /t 2 /nobreak >nul

echo [3/3] Starting server and client...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the application
echo.

call npm run dev

pause


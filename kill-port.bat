@echo off
echo ========================================
echo  Kill Process on Port 5000
echo ========================================
echo.

echo Checking port 5000...
netstat -ano | findstr :5000

echo.
echo Killing process on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo Port 5000 should be free now!
echo.
pause


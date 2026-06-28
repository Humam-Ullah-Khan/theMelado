@echo off
title Melado by Guluna
echo ========================================
echo    Melado by Guluna - Startup
echo ========================================
echo.

echo [1/3] Starting MongoDB...
taskkill /f /im mongod.exe >nul 2>&1
start "Melado-MongoDB" "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "D:\humam\Melado\mongodb-data" --port 27017
timeout /t 4 /nobreak >nul

echo [2/3] Starting Backend...
start "Melado-Backend" cmd /c "cd /d D:\humam\Melado\server && node index.js"
timeout /t 2 /nobreak >nul

echo [3/3] Starting Frontend...
start "Melado-Frontend" cmd /c "cd /d D:\humam\Melado\client && npm run dev"

echo.
echo ========================================
echo    All services running!
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5001
echo    Admin:    http://localhost:3000/admin
echo ========================================
echo.
echo IMPORTANT: Close this window to stop all services.
pause

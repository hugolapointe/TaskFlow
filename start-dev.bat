@echo off
echo Starting TaskFlow API...
echo.

start "TaskFlow API" cmd /k "cd TaskFlow.WebAPI && dotnet run --launch-profile http"
timeout /t 3 /nobreak >nul

echo.
echo API starting...
echo API: http://localhost:5154

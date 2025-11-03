@echo off
echo Starting TaskFlow API and React...
echo.

start "TaskFlow API" cmd /k "cd TaskFlow.WebAPI && dotnet run --launch-profile http"
timeout /t 3 /nobreak >nul
start "TaskFlow React" cmd /k "cd TaskFlow.WebSite && npm run dev"

echo.
echo Both projects starting...
echo API: http://localhost:5154
echo React: http://localhost:5173

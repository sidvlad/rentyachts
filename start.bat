@echo off
echo ========================================
echo    ON THE SEA - Local Server
echo ========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js not found. Trying Python...
    goto :python
)

echo Starting server at http://localhost:8080
echo Press Ctrl+C to stop
echo.
npx http-server -p 8080 -o
goto :end

:python
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Neither Node.js nor Python found!
    echo Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo Starting server at http://localhost:8080
echo Press Ctrl+C to stop
echo.
start http://localhost:8080
python -m http.server 8080

:end

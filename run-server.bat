@echo off
REM Cuizzy Project Launcher (Windows Batch version)
REM Run this script to start the project with a local server

setlocal enabledelayedexpansion

set PORT=8000
set "PROJECT_DIR=%~dp0"

echo ============================================================
echo 9x60 Launching Cuizzy Project
echo ============================================================
echo 201C Project Directory: %PROJECT_DIR%
echo 267F Server: http://localhost:%PORT%
echo ============================================================
echo.
echo 2705 Server starting...
echo.

cd /d "%PROJECT_DIR%"

echo 1F680 Server running at http://localhost:%PORT%
echo 1F4F1 Open in browser or use CLICKTOOPEN.html
echo 2328 Press CTRL+C to stop the server
echo.

REM Start Python HTTP server
python -m http.server %PORT%

pause

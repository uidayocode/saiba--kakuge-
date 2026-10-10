@echo off
rem Double-click: get the latest version from GitHub (if git is installed), then open the fighting game.
cd /d "%~dp0"
where git >nul 2>nul
if %errorlevel%==0 (
  echo Updating...
  git pull --ff-only
) else (
  echo git not found - opening the local copy without updating.
)
start "" "%~dp0fighting\game.html"

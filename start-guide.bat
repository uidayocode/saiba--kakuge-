@echo off
rem Exhibit guide (guide.html) in kiosk mode: full screen, no address bar, no tabs.
rem Uses its own browser profile, so no Claude / Google sign-in is visible to visitors.
rem Staff settings inside the page: Ctrl+Shift+S.  Quit kiosk: Alt+F4.
set "PAGE=%~dp0guide.html"
set "PROFILE=%LOCALAPPDATA%\denno-guide-kiosk"
set "OPTS=--kiosk --user-data-dir="%PROFILE%" --no-first-run --no-default-browser-check --disable-translate --disable-pinch --overscroll-history-navigation=0"
set "B=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%B%" set "B=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%B%" set "B=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
if exist "%B%" goto run
set "B=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%B%" set "B=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not exist "%B%" goto none
set "OPTS=%OPTS% --edge-kiosk-type=fullscreen"
:run
start "" "%B%" %OPTS% "%PAGE%"
goto :eof
:none
echo Chrome or Edge was not found. Please install Google Chrome.
pause

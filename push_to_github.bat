@echo off
echo ==========================================
echo      Nexus Gaming - GitHub Pusher
echo ==========================================

:: 1. Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not found in your PATH.
    echo.
    echo Please download and install Git from: https://git-scm.com/downloads
    echo After installing, restart your terminal and run this script again.
    echo.
    pause
    exit /b
)

echo [INFO] Git found. Proceeding...

:: 2. Initialize and Commit
if not exist ".git" (
    echo [INFO] Initializing new repository...
    git init
)

echo [INFO] Adding files...
git add .
git commit -m "Complete Project: Nexus Gaming E-commerce"

:: 3. Remote Configuration
echo [INFO] Configuring remote...
:: Remove origin if it exists to avoid errors on re-run
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Sri9081/E-commerce-Gaming-site.git

:: 4. Push
echo [INFO] Pushing to GitHub (main)...
git branch -M main
git push -u origin main

echo.
echo [SUCCESS] Project pushed successfully!
pause

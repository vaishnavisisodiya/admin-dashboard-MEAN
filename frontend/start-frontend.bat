@echo off
echo ============================================
echo  Admin Dashboard - Frontend Setup
echo ============================================
echo.

cd frontend

if exist node_modules (
    echo Frontend dependencies already installed
) else (
    echo Installing frontend dependencies (this may take 5-10 minutes)...
    call npm install
)

echo.
echo Starting Angular Development Server...
echo.
echo Frontend will be available at http://localhost:4200
echo.

call npm start

@echo off
echo ================================================
echo   Springboard Indian School - Backend Setup
echo ================================================
echo.

:: Check Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python not found. Please install Python 3.10+ from python.org
    pause
    exit /b 1
)

echo [1/5] Creating virtual environment...
python -m venv venv
call venv\Scripts\activate.bat

echo.
echo [2/5] Installing dependencies...
pip install -r requirements.txt

echo.
echo [3/5] Running database migrations...
python manage.py migrate

echo.
echo [4/5] Loading initial data...
python manage.py shell -c "
from apps.seo.models import SeoPage
pages = [
    ('home','Home Page','Springboard Indian School Hyderabad | Best CBSE School','Springboard Indian School is a premier CBSE school in Hyderabad. Admissions open for 2026-27.'),
    ('about','About Page','About Springboard Indian School | Our Story and Mission','Learn about Springboard Indian School history, vision, mission in Hyderabad.'),
    ('admissions','Admissions Page','School Admissions 2026-27 | Springboard Indian School','Apply now for 2026-27. Limited seats available. Pre-K to Grade 10.'),
    ('academics','Academics Page','CBSE Academic Programs | Springboard Indian School','Explore CBSE academic programs from Pre-K through Grade 10.'),
    ('contact','Contact Page','Contact Springboard Indian School Hyderabad','Get in touch for admissions and enquiries.'),
]
for key,label,title,desc in pages:
    SeoPage.objects.get_or_create(page_key=key,defaults={'page_label':label,'meta_title':title,'meta_description':desc})
from apps.settings_app.models import SiteSettings
SiteSettings.get()
print('Initial data loaded.')
"

echo.
echo [5/5] Creating admin account...
python manage.py create_admin

echo.
echo ================================================
echo   Setup Complete!
echo.
echo   Admin Login  : http://localhost:5173/admin/login
echo   Username     : admin
echo   Password     : admin@123
echo.
echo   Run  start.bat  to launch the backend server
echo ================================================
pause

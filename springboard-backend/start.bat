@echo off
echo ================================================
echo   Springboard Backend  -  http://localhost:8000
echo ================================================
echo.
echo   API:      http://localhost:8000/api/
echo   Docs:     http://localhost:8000/api/docs/
echo   Django Admin: http://localhost:8000/django-admin/
echo.
echo   Press Ctrl+C to stop the server
echo ================================================
echo.

call venv\Scripts\activate.bat
python manage.py runserver 0.0.0.0:8000

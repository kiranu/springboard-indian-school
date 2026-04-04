# Springboard Indian School — Django Backend

## Quick Setup

### 1. Create virtual environment
```bash
cd springboard-backend
python3 -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env with your MySQL credentials and secret key
```

### 4. Create MySQL database
```sql
CREATE DATABASE springboard_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'springboard'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON springboard_db.* TO 'springboard'@'localhost';
FLUSH PRIVILEGES;
```

### 5. Run migrations
```bash
python manage.py migrate
```

### 6. Create superuser (for admin panel)
```bash
python manage.py createsuperuser
```

### 7. Start development server
```bash
python manage.py runserver
```

The API will be available at: http://localhost:8000/api/

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login/ | Get JWT token |
| POST | /api/auth/refresh/ | Refresh token |
| GET | /api/blog/ | List published posts |
| GET | /api/blog/{slug}/ | Get single post |
| GET | /api/events/ | List published events |
| GET | /api/gallery/ | List gallery items |
| GET | /api/testimonials/ | List testimonials |
| POST | /api/enquiries/ | Submit enquiry (public) |
| GET | /api/admin/dashboard/ | Dashboard stats (auth) |
| CRUD | /api/admin/blogs/ | Manage blogs (auth) |
| CRUD | /api/admin/events/ | Manage events (auth) |
| CRUD | /api/admin/gallery/ | Manage gallery (auth) |
| CRUD | /api/admin/enquiries/ | Manage enquiries (auth) |
| CRUD | /api/admin/testimonials/ | Manage testimonials (auth) |
| CRUD | /api/admin/seo/ | Manage SEO settings (auth) |
| GET/PUT | /api/admin/settings/ | Site settings (auth) |

## API Docs
Visit http://localhost:8000/api/docs/ for interactive Swagger documentation.

## Production Deployment
```bash
# Collect static files
python manage.py collectstatic --noinput

# Run with Gunicorn
gunicorn springboard.wsgi:application --bind 0.0.0.0:8000 --workers 4

# Start Celery worker
celery -A springboard worker -l info

# Start Celery Beat (scheduled tasks)
celery -A springboard beat -l info
```

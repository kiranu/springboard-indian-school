# Springboard Indian School — Website Blueprint
### Full-Stack Implementation Guide | Django DRF + React TypeScript

> **Version:** 2.0 — April 2026
> **Tech Stack:** Django 5 (DRF) · MySQL 8 · React 18 (TypeScript) · Tailwind CSS · shadcn/ui
> **Performance Target:** Lighthouse 90+ · Core Web Vitals Pass
> **Audience:** Parents · Students · Admin Staff · Developers

---

## Table of Contents

1. [Project Overview & Objectives](#1-project-overview--objectives)
2. [Tech Stack Decision](#2-tech-stack-decision)
3. [Project Folder Structure](#3-project-folder-structure)
4. [Database Schema (MySQL)](#4-database-schema-mysql)
5. [Backend — Django DRF](#5-backend--django-drf)
6. [Frontend — React TypeScript](#6-frontend--react-typescript)
7. [Admin Panel Architecture](#7-admin-panel-architecture)
8. [SEO & GEO Strategy for Hyderabad](#8-seo--geo-strategy-for-hyderabad)
9. [Blog Content Calendar](#9-blog-content-calendar)
10. [Internal Linking Strategy](#10-internal-linking-strategy)
11. [Sample Content: Home Page](#11-sample-content-home-page)
12. [Sample Content: About Page](#12-sample-content-about-page)
13. [Sample Content: Admissions Page](#13-sample-content-admissions-page)
14. [Deployment Guide](#14-deployment-guide)
15. [Future Integration Roadmap](#15-future-integration-roadmap)

---

## 1. Project Overview & Objectives

This document is the complete technical and content blueprint for building the **Springboard Indian School** website — transforming the purchased Toddly HTML template into a dynamic, scalable, production-ready school platform. The website serves as the primary digital touchpoint for parents, students, and prospective admissions across Hyderabad.

### Four Core Pillars

| Pillar | Goal |
|--------|------|
| **Conversion Engine** | Every page designed to convert visitors into admission enquiries |
| **SEO & GEO Dominance** | Rank #1 for Hyderabad school searches — including AI-powered results (ChatGPT, Google SGE) |
| **Trust Architecture** | Build parent confidence through social proof, safety signals, and academic achievements |
| **Future-Ready Platform** | Architected to evolve into a full school ERP — parent portal, fee system, student dashboard |

### Required Pages

1. Home (high-conversion landing page)
2. About Us
3. Academics (Play Group to Grade 7)
4. Admissions
5. Facilities
6. Gallery (dynamic)
7. Events / News (dynamic CMS)
8. Blog (SEO-focused)
9. Contact Us
10. Parent Portal Entry (future placeholder)

---

## 2. Tech Stack Decision

### Full Stack Overview

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Backend** | Django 5.x + Django REST Framework | Batteries-included, secure, ORM-powered, ideal for rapid CMS + API build |
| **API Style** | REST (DRF) — GraphQL migration path in Phase 2 | Simple to implement, well-documented, wide ecosystem |
| **Frontend** | React 18 + TypeScript | Type-safe, component-driven, scalable from Blade → SPA with no rewrite |
| **UI Framework** | Tailwind CSS + shadcn/ui | Utility-first styling + accessible, headless components — production-grade UI fast |
| **Database** | MySQL 8.0+ | Reliable, widely hosted, excellent Django ORM support |
| **Cache** | Redis | Session, cache, Celery queue broker |
| **Task Queue** | Celery + Redis | Async email notifications, sitemap generation |
| **Search** | Django Haystack + Meilisearch | Blog/content full-text search |
| **Auth** | Django Auth + SimpleJWT | Token-based auth for API + admin |
| **File Storage** | Local (dev) → AWS S3 / Cloudflare R2 (prod) | django-storages handles the switch |
| **Email** | Django Mail + SMTP (SendGrid / SES) | Queued via Celery |
| **CDN** | Cloudflare (Free tier) | Assets, DDoS protection, SSL |
| **CI/CD** | GitHub Actions | Auto-deploy to VPS on push to `main` |
| **Hosting** | DigitalOcean / Hetzner VPS | Ubuntu 22.04, Nginx, Gunicorn |

### Why Django DRF over Laravel / Node

- Django's ORM and admin panel drastically reduce time to build the CMS
- DRF provides a clean, self-documenting API out of the box (Swagger/OpenAPI)
- Python ecosystem is superior for future AI/ML features (attendance prediction, chatbot)
- TypeScript React frontend is fully decoupled — can be replaced or extended independently
- shadcn/ui gives a professional, accessible UI with zero design overhead

---

## 3. Project Folder Structure

### Backend (Django)

```
springboard-backend/
├── manage.py
├── requirements.txt
├── .env
├── config/                          # Project settings package
│   ├── __init__.py
│   ├── settings/
│   │   ├── base.py                  # Shared settings
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py                      # Root URL config
│   ├── wsgi.py
│   └── asgi.py
│
├── apps/
│   ├── core/                        # Shared utilities, base models, mixins
│   │   ├── models.py                # TimeStampedModel, SoftDeleteModel
│   │   ├── permissions.py
│   │   └── pagination.py
│   │
│   ├── seo/                         # SEO meta management
│   │   ├── models.py                # SeoMeta (generic FK)
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── admin.py
│   │
│   ├── blog/                        # Blog CMS
│   │   ├── models.py                # Blog, BlogCategory
│   │   ├── serializers.py
│   │   ├── views.py                 # BlogListView, BlogDetailView
│   │   ├── filters.py
│   │   ├── admin.py
│   │   └── urls.py
│   │
│   ├── events/                      # Events & News
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── admin.py
│   │   └── urls.py
│   │
│   ├── gallery/                     # Photo gallery
│   │   ├── models.py                # GalleryAlbum, GalleryImage
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── admin.py
│   │   └── urls.py
│   │
│   ├── enquiries/                   # Admission + contact forms
│   │   ├── models.py                # Enquiry
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── tasks.py                 # Celery email tasks
│   │   ├── admin.py
│   │   └── urls.py
│   │
│   ├── testimonials/                # Parent reviews
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── admin.py
│   │
│   └── settings_app/               # Key-value site settings
│       ├── models.py
│       ├── serializers.py
│       └── admin.py
│
├── api/
│   └── v1/
│       └── urls.py                  # All /api/v1/ routes aggregated
│
├── services/
│   ├── sitemap.py                   # Sitemap generation service
│   ├── email.py                     # Email template helpers
│   └── schema.py                    # JSON-LD schema builders
│
└── media/                           # Uploaded files (dev only)
```

### Frontend (React TypeScript)

```
springboard-frontend/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── components.json                  # shadcn/ui config
├── .env
│
├── public/
│   ├── robots.txt
│   ├── sitemap.xml                  # Static fallback (dynamic from API)
│   └── assets/
│       ├── images/
│       └── icons/
│
├── src/
│   ├── main.tsx
│   ├── App.tsx                      # Router + layout wrapper
│   │
│   ├── pages/                       # Route-level components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Academics.tsx
│   │   ├── Admissions.tsx
│   │   ├── Facilities.tsx
│   │   ├── Gallery.tsx
│   │   ├── Events/
│   │   │   ├── EventList.tsx
│   │   │   └── EventDetail.tsx
│   │   ├── Blog/
│   │   │   ├── BlogList.tsx
│   │   │   └── BlogDetail.tsx
│   │   ├── Contact.tsx
│   │   ├── ParentPortal.tsx         # Placeholder
│   │   └── NotFound.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Sticky header + mobile nav
│   │   │   ├── Footer.tsx
│   │   │   └── Breadcrumb.tsx
│   │   ├── seo/
│   │   │   └── SeoHead.tsx          # Dynamic meta + JSON-LD injection
│   │   ├── ui/                      # shadcn/ui components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── shared/
│   │   │   ├── AdmissionCta.tsx     # Reusable CTA block
│   │   │   ├── WhatsAppButton.tsx   # Floating button
│   │   │   ├── EnquiryPopup.tsx     # Quick enquiry modal
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── EventCard.tsx
│   │   │   └── StatsBar.tsx
│   │   └── home/
│   │       ├── HeroSection.tsx
│   │       ├── WhySpringboard.tsx
│   │       ├── ProgramsSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       └── FaqSection.tsx
│   │
│   ├── hooks/
│   │   ├── useApi.ts                # Generic API fetch hook
│   │   ├── useEnquiryForm.ts
│   │   └── useSeo.ts
│   │
│   ├── lib/
│   │   ├── api.ts                   # Axios instance + interceptors
│   │   ├── utils.ts                 # shadcn/ui cn() + helpers
│   │   └── schema.ts                # JSON-LD builders
│   │
│   ├── types/
│   │   ├── blog.ts
│   │   ├── event.ts
│   │   ├── gallery.ts
│   │   ├── enquiry.ts
│   │   └── seo.ts
│   │
│   └── styles/
│       └── globals.css              # Tailwind directives + CSS vars
│
└── admin/                           # React Admin Panel (separate route /admin)
    ├── pages/
    │   ├── Dashboard.tsx
    │   ├── Blogs/
    │   ├── Events/
    │   ├── Gallery/
    │   ├── Enquiries/
    │   └── Settings/
    └── components/
        ├── AdminLayout.tsx
        └── DataTable.tsx
```

---

## 4. Database Schema (MySQL)

```sql
-- ============================================================
-- Core: SEO Meta (polymorphic — used by all pages/blogs/events)
-- ============================================================
CREATE TABLE seo_metas (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  content_type_id INT NULL,             -- Django ContentType FK (for polymorphic)
  object_id       BIGINT UNSIGNED NULL,
  page_key        VARCHAR(100) NULL,    -- 'home', 'about', 'admissions', etc.
  title           VARCHAR(160),
  description     VARCHAR(320),
  keywords        TEXT,
  og_title        VARCHAR(160),
  og_description  VARCHAR(320),
  og_image        VARCHAR(500),
  canonical_url   VARCHAR(500),
  schema_json     LONGTEXT,             -- JSON-LD Schema markup
  robots          VARCHAR(50) DEFAULT 'index, follow',
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_page_key (page_key),
  INDEX idx_poly (content_type_id, object_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Blog
-- ============================================================
CREATE TABLE blog_categories (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE blogs (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id     BIGINT UNSIGNED,
  title           VARCHAR(255) NOT NULL,
  slug            VARCHAR(255) NOT NULL UNIQUE,
  excerpt         TEXT,
  content         LONGTEXT,
  featured_image  VARCHAR(500),
  author_name     VARCHAR(100) DEFAULT 'Springboard School Team',
  read_time       TINYINT UNSIGNED DEFAULT 5,
  is_published    BOOLEAN DEFAULT FALSE,
  published_at    DATETIME NULL,
  views           INT UNSIGNED DEFAULT 0,
  deleted_at      DATETIME NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_published (is_published, published_at),
  FULLTEXT idx_search (title, excerpt, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Events
-- ============================================================
CREATE TABLE events (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title           VARCHAR(255) NOT NULL,
  slug            VARCHAR(255) NOT NULL UNIQUE,
  description     LONGTEXT,
  featured_image  VARCHAR(500),
  event_date      DATE NOT NULL,
  event_time      TIME NULL,
  location        VARCHAR(255),
  event_type      ENUM('academic','cultural','sports','workshop','other') DEFAULT 'other',
  is_published    BOOLEAN DEFAULT FALSE,
  is_featured     BOOLEAN DEFAULT FALSE,
  deleted_at      DATETIME NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_event_date (event_date),
  INDEX idx_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Gallery
-- ============================================================
CREATE TABLE gallery_albums (
  id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  slug         VARCHAR(255) NOT NULL UNIQUE,
  description  TEXT,
  cover_image  VARCHAR(500),
  is_published BOOLEAN DEFAULT TRUE,
  sort_order   INT DEFAULT 0,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE gallery_images (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  album_id   BIGINT UNSIGNED NOT NULL,
  title      VARCHAR(255) NULL,
  alt_text   VARCHAR(255) NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (album_id) REFERENCES gallery_albums(id) ON DELETE CASCADE,
  INDEX idx_album (album_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Enquiries
-- ============================================================
CREATE TABLE enquiries (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type            ENUM('admission','callback','contact','visit') DEFAULT 'admission',
  parent_name     VARCHAR(150) NOT NULL,
  child_name      VARCHAR(150) NULL,
  phone           VARCHAR(15) NOT NULL,
  email           VARCHAR(255) NULL,
  grade_applying  VARCHAR(50) NULL,
  message         TEXT NULL,
  source_page     VARCHAR(255),
  utm_source      VARCHAR(100) NULL,
  utm_medium      VARCHAR(100) NULL,
  utm_campaign    VARCHAR(100) NULL,
  ip_address      VARCHAR(45),
  status          ENUM('new','contacted','converted','not_interested') DEFAULT 'new',
  notes           TEXT NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_type (type),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Testimonials
-- ============================================================
CREATE TABLE testimonials (
  id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  parent_name  VARCHAR(150) NOT NULL,
  child_grade  VARCHAR(50),
  content      TEXT NOT NULL,
  rating       TINYINT UNSIGNED DEFAULT 5,
  photo        VARCHAR(500) NULL,
  is_featured  BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order   INT DEFAULT 0,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Site Settings (key-value store)
-- ============================================================
CREATE TABLE site_settings (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  group_name VARCHAR(50) NOT NULL,      -- 'general', 'seo', 'contact', 'social'
  key_name   VARCHAR(100) NOT NULL UNIQUE,
  value      LONGTEXT NULL,
  value_type ENUM('text','textarea','image','boolean','json') DEFAULT 'text',
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_group (group_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 5. Backend — Django DRF

### 5.1 Project Settings (`config/settings/base.py`)

```python
from pathlib import Path
import environ

env = environ.Env()
BASE_DIR = Path(__file__).resolve().parent.parent.parent

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "django_filters",
    "storages",
    "celery",
    # Local apps
    "apps.core",
    "apps.seo",
    "apps.blog",
    "apps.events",
    "apps.gallery",
    "apps.enquiries",
    "apps.testimonials",
    "apps.settings_app",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_PAGINATION_CLASS": "apps.core.pagination.StandardPagination",
    "PAGE_SIZE": 12,
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
}

DATABASES = {
    "default": {
        "ENGINE":   "django.db.backends.mysql",
        "NAME":     env("DB_NAME"),
        "USER":     env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST":     env("DB_HOST", default="127.0.0.1"),
        "PORT":     env("DB_PORT", default="3306"),
        "OPTIONS":  {"charset": "utf8mb4", "init_command": "SET sql_mode='STRICT_TRANS_TABLES'"},
    }
}

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env("REDIS_URL", default="redis://127.0.0.1:6379/1"),
    }
}

CELERY_BROKER_URL = env("REDIS_URL", default="redis://127.0.0.1:6379/0")
CELERY_RESULT_BACKEND = env("REDIS_URL", default="redis://127.0.0.1:6379/0")

CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=["http://localhost:5173"])
```

### 5.2 Core Base Model

```python
# apps/core/models.py
from django.db import models

class TimeStampedModel(models.Model):
    """Abstract base — adds created_at / updated_at to every model."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class SoftDeleteModel(TimeStampedModel):
    """Abstract base — adds soft delete support."""
    deleted_at = models.DateTimeField(null=True, blank=True)

    def soft_delete(self):
        from django.utils import timezone
        self.deleted_at = timezone.now()
        self.save()

    class Meta:
        abstract = True
```

### 5.3 Blog App

```python
# apps/blog/models.py
from django.db import models
from django.utils.text import slugify
from apps.core.models import SoftDeleteModel

class BlogCategory(models.Model):
    name        = models.CharField(max_length=100)
    slug        = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Blog Categories"

    def __str__(self): return self.name


class Blog(SoftDeleteModel):
    category       = models.ForeignKey(BlogCategory, null=True, blank=True,
                                        on_delete=models.SET_NULL, related_name="blogs")
    title          = models.CharField(max_length=255)
    slug           = models.SlugField(unique=True, max_length=255)
    excerpt        = models.TextField(blank=True)
    content        = models.TextField()
    featured_image = models.ImageField(upload_to="blog/", null=True, blank=True)
    author_name    = models.CharField(max_length=100, default="Springboard School Team")
    read_time      = models.PositiveSmallIntegerField(default=5)
    is_published   = models.BooleanField(default=False)
    published_at   = models.DateTimeField(null=True, blank=True)
    views          = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-published_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self): return self.title


# apps/blog/serializers.py
from rest_framework import serializers
from .models import Blog, BlogCategory

class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model  = BlogCategory
        fields = ["id", "name", "slug"]

class BlogListSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)

    class Meta:
        model  = Blog
        fields = ["id","title","slug","excerpt","featured_image",
                  "author_name","read_time","published_at","category"]

class BlogDetailSerializer(BlogListSerializer):
    class Meta(BlogListSerializer.Meta):
        fields = BlogListSerializer.Meta.fields + ["content", "views"]


# apps/blog/views.py
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Blog
from .serializers import BlogListSerializer, BlogDetailSerializer

class BlogListView(generics.ListAPIView):
    queryset            = Blog.objects.filter(is_published=True, deleted_at__isnull=True)
    serializer_class    = BlogListSerializer
    filter_backends     = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields    = ["category__slug"]
    search_fields       = ["title", "excerpt", "content"]

class BlogDetailView(generics.RetrieveAPIView):
    queryset         = Blog.objects.filter(is_published=True, deleted_at__isnull=True)
    serializer_class = BlogDetailSerializer
    lookup_field     = "slug"

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save(update_fields=["views"])
        return super().retrieve(request, *args, **kwargs)
```

### 5.4 Enquiry API + Celery Email Task

```python
# apps/enquiries/models.py
from django.db import models
from apps.core.models import TimeStampedModel

class Enquiry(TimeStampedModel):
    TYPE_CHOICES   = [("admission","Admission"),("callback","Callback"),
                      ("contact","Contact"),("visit","School Visit")]
    STATUS_CHOICES = [("new","New"),("contacted","Contacted"),
                      ("converted","Converted"),("not_interested","Not Interested")]

    type           = models.CharField(max_length=20, choices=TYPE_CHOICES, default="admission")
    parent_name    = models.CharField(max_length=150)
    child_name     = models.CharField(max_length=150, blank=True)
    phone          = models.CharField(max_length=15)
    email          = models.EmailField(blank=True)
    grade_applying = models.CharField(max_length=50, blank=True)
    message        = models.TextField(blank=True)
    source_page    = models.CharField(max_length=255, blank=True)
    utm_source     = models.CharField(max_length=100, blank=True)
    utm_medium     = models.CharField(max_length=100, blank=True)
    utm_campaign   = models.CharField(max_length=100, blank=True)
    ip_address     = models.GenericIPAddressField(null=True, blank=True)
    status         = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    notes          = models.TextField(blank=True)

    class Meta:
        ordering       = ["-created_at"]
        verbose_name_plural = "Enquiries"

    def __str__(self): return f"{self.parent_name} — {self.type} ({self.created_at.date()})"


# apps/enquiries/serializers.py
from rest_framework import serializers
import re
from .models import Enquiry

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Enquiry
        fields = ["type","parent_name","child_name","phone","email","grade_applying","message"]

    def validate_phone(self, value):
        if not re.match(r'^[6-9]\d{9}$', value):
            raise serializers.ValidationError("Enter a valid 10-digit Indian mobile number.")
        return value


# apps/enquiries/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Enquiry
from .serializers import EnquirySerializer
from .tasks import send_enquiry_notifications

class EnquiryCreateView(generics.CreateAPIView):
    serializer_class = EnquirySerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save(
            source_page  = request.META.get("HTTP_REFERER", "direct"),
            ip_address   = request.META.get("REMOTE_ADDR"),
            utm_source   = request.query_params.get("utm_source",""),
            utm_medium   = request.query_params.get("utm_medium",""),
            utm_campaign = request.query_params.get("utm_campaign",""),
        )
        # Fire-and-forget email via Celery
        send_enquiry_notifications.delay(enquiry.id)
        return Response(
            {"success": True, "message": "Thank you! We will contact you within 24 hours."},
            status=status.HTTP_201_CREATED
        )


# apps/enquiries/tasks.py
from config.celery import app
from django.core.mail import send_mail
from django.conf import settings

@app.task(bind=True, max_retries=3)
def send_enquiry_notifications(self, enquiry_id: int):
    from .models import Enquiry
    try:
        enquiry = Enquiry.objects.get(id=enquiry_id)
        # Admin notification
        send_mail(
            subject=f"[New Enquiry] {enquiry.type.title()} — {enquiry.parent_name}",
            message=f"Name: {enquiry.parent_name}\nPhone: {enquiry.phone}\nType: {enquiry.type}\nGrade: {enquiry.grade_applying}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.SCHOOL_ADMIN_EMAIL],
        )
        # Parent confirmation
        if enquiry.email:
            send_mail(
                subject="Thank you for your enquiry — Springboard Indian School",
                message=f"Dear {enquiry.parent_name},\n\nThank you for reaching out to Springboard Indian School. Our admissions team will contact you within 24 hours.\n\nWarm regards,\nSpringboard Admissions Team",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[enquiry.email],
            )
    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)
```

### 5.5 API URL Configuration

```python
# api/v1/urls.py
from django.urls import path, include

urlpatterns = [
    # Blog
    path("blogs/",              include("apps.blog.urls")),
    # Events
    path("events/",             include("apps.events.urls")),
    # Gallery
    path("gallery/",            include("apps.gallery.urls")),
    # Enquiries
    path("enquiries/",          include("apps.enquiries.urls")),
    # Testimonials
    path("testimonials/",       include("apps.testimonials.urls")),
    # SEO
    path("seo/",                include("apps.seo.urls")),
    # Settings
    path("settings/",           include("apps.settings_app.urls")),
]

# config/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/",       admin.site.urls),
    path("api/v1/",      include("api.v1.urls")),
    path("api/auth/",    include("rest_framework_simplejwt.urls")),
]
```

### 5.6 Django Admin Customisation

```python
# apps/enquiries/admin.py
from django.contrib import admin
from .models import Enquiry

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display   = ["parent_name","phone","type","grade_applying","status","created_at"]
    list_filter    = ["type","status","created_at"]
    search_fields  = ["parent_name","phone","email"]
    list_editable  = ["status"]
    ordering       = ["-created_at"]
    readonly_fields = ["ip_address","source_page","utm_source","utm_medium","utm_campaign","created_at"]
    date_hierarchy = "created_at"

    def get_queryset(self, request):
        return super().get_queryset(request).select_related()
```

### 5.7 School Schema JSON-LD Service

```python
# services/schema.py
from django.conf import settings

def get_school_schema() -> dict:
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["School", "LocalBusiness"],
                "@id": f"{settings.SITE_URL}/#school",
                "name": "Springboard Indian School",
                "alternateName": "Springboard School Hyderabad",
                "description": "One of Hyderabad's leading CBSE schools offering holistic education from Play Group to Grade 7 in a safe, nurturing environment.",
                "url": settings.SITE_URL,
                "logo": f"{settings.SITE_URL}/assets/images/logo.png",
                "telephone": settings.SCHOOL_PHONE,
                "email": settings.SCHOOL_EMAIL,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": settings.SCHOOL_ADDRESS,
                    "addressLocality": "Hyderabad",
                    "addressRegion": "Telangana",
                    "postalCode": settings.SCHOOL_PINCODE,
                    "addressCountry": "IN"
                },
                "openingHours": "Mo-Fr 08:00-17:00",
                "curriculumOffered": "CBSE",
                "sameAs": [
                    settings.FACEBOOK_URL,
                    settings.INSTAGRAM_URL,
                ]
            },
            {
                "@type": "WebSite",
                "@id": f"{settings.SITE_URL}/#website",
                "url": settings.SITE_URL,
                "name": "Springboard Indian School",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": f"{settings.SITE_URL}/blog?q={{search_term_string}}",
                    "query-input": "required name=search_term_string"
                }
            }
        ]
    }
```

---

## 6. Frontend — React TypeScript

### 6.1 Vite + Tailwind Setup

```bash
# Bootstrap the project
npm create vite@latest springboard-frontend -- --template react-ts
cd springboard-frontend

# Core dependencies
npm install axios react-router-dom react-helmet-async
npm install @tanstack/react-query zustand

# UI
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init

# Forms
npm install react-hook-form @hookform/resolvers zod

# Dev
npm install -D @types/node prettier eslint
```

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:   "#1B4F8E",
          orange: "#E8701A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### 6.2 API Client (`src/lib/api.ts`)

```typescript
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);
```

### 6.3 SEO Head Component (`src/components/seo/SeoHead.tsx`)

```typescript
import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title:       string;
  description: string;
  canonical?:  string;
  ogImage?:    string;
  schema?:     object;
  noIndex?:    boolean;
}

const SITE_NAME = "Springboard Indian School";
const BASE_URL  = "https://springboardindianschool.in";

export function SeoHead({ title, description, canonical, ogImage, schema, noIndex }: SeoHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME}, Hyderabad`;
  const resolvedCanonical = canonical ?? (BASE_URL + window.location.pathname);
  const resolvedImage = ogImage ?? `${BASE_URL}/assets/images/og-default.jpg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={resolvedCanonical} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={resolvedImage} />
      <meta property="og:url"         content={resolvedCanonical} />
      <meta property="og:type"        content="website" />
      <meta property="og:locale"      content="en_IN" />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={resolvedImage} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
```

### 6.4 Enquiry Form with Zod + React Hook Form

```typescript
// src/hooks/useEnquiryForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const enquirySchema = z.object({
  type:           z.enum(["admission", "callback", "contact", "visit"]),
  parent_name:    z.string().min(2, "Please enter your name"),
  child_name:     z.string().optional(),
  phone:          z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email:          z.string().email("Enter a valid email").optional().or(z.literal("")),
  grade_applying: z.string().optional(),
  message:        z.string().max(1000).optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export function useEnquiryForm() {
  const form = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { type: "admission" },
  });

  const mutation = useMutation({
    mutationFn: (data: EnquiryFormData) => api.post("/enquiries/", data),
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return { form, onSubmit, isPending: mutation.isPending, isSuccess: mutation.isSuccess, error: mutation.error };
}
```

### 6.5 Floating WhatsApp Button (`src/components/shared/WhatsAppButton.tsx`)

```typescript
const WA_NUMBER = "91XXXXXXXXXX";
const WA_MSG    = encodeURIComponent(
  "Hello! I am interested in admissions at Springboard Indian School. Please share details."
);

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-7 right-6 z-50
        flex items-center gap-2.5
        bg-[#25D366] text-white
        rounded-full px-5 py-3
        shadow-[0_4px_20px_rgba(37,211,102,0.45)]
        font-semibold text-sm
        hover:scale-105 hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)]
        transition-all duration-200
        animate-pulse-slow
      "
    >
      <img src="/assets/icons/whatsapp.svg" width={24} height={24} alt="" />
      Enquire Now
    </a>
  );
}
```

### 6.6 React Router Setup (`src/App.tsx`)

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { EnquiryPopup } from "@/components/shared/EnquiryPopup";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Academics from "@/pages/Academics";
import Admissions from "@/pages/Admissions";
import Facilities from "@/pages/Facilities";
import Gallery from "@/pages/Gallery";
import { EventList, EventDetail } from "@/pages/Events";
import { BlogList, BlogDetail } from "@/pages/Blog";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/"              element={<Home />} />
              <Route path="/about"         element={<About />} />
              <Route path="/academics"     element={<Academics />} />
              <Route path="/admissions"    element={<Admissions />} />
              <Route path="/facilities"    element={<Facilities />} />
              <Route path="/gallery"       element={<Gallery />} />
              <Route path="/events"        element={<EventList />} />
              <Route path="/events/:slug"  element={<EventDetail />} />
              <Route path="/blog"          element={<BlogList />} />
              <Route path="/blog/:slug"    element={<BlogDetail />} />
              <Route path="/contact"       element={<Contact />} />
              <Route path="*"             element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <EnquiryPopup />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
```

---

## 7. Admin Panel Architecture

The admin panel has two layers:

1. **Django's built-in admin** (`/django-admin/`) — for super-users managing raw data, user accounts, and system settings
2. **Custom React Admin** (`/admin/`) — a branded dashboard for school staff to manage content, view enquiries, upload gallery, etc.

### 7.1 React Admin — Key Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin` | `Dashboard.tsx` | Stats: enquiries, blogs, events |
| `/admin/enquiries` | `EnquiryTable.tsx` | View, filter, update status, export CSV |
| `/admin/blogs` | `BlogEditor.tsx` | Rich text editor (TipTap), SEO fields |
| `/admin/events` | `EventEditor.tsx` | Create/edit events |
| `/admin/gallery` | `GalleryManager.tsx` | Drag-drop image upload per album |
| `/admin/testimonials` | `TestimonialEditor.tsx` | Manage parent reviews |
| `/admin/settings` | `SiteSettings.tsx` | Contact info, social links, SEO defaults |

### 7.2 Admin Dashboard Stats Component

```typescript
// admin/pages/Dashboard.tsx
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { key: "new_enquiries",   label: "New Enquiries",    color: "text-orange-500" },
  { key: "total_enquiries", label: "Total Enquiries",  color: "text-blue-600"  },
  { key: "published_blogs", label: "Published Blogs",  color: "text-green-600" },
  { key: "upcoming_events", label: "Upcoming Events",  color: "text-purple-600"},
];

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn:  () => api.get("/admin/stats/").then(r => r.data),
  });

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map(({ key, label, color }) => (
        <Card key={key}>
          <CardHeader><CardTitle className="text-sm text-gray-500">{label}</CardTitle></CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${color}`}>{data?.[key] ?? "—"}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## 8. SEO & GEO Strategy for Hyderabad

### 8.1 Primary Keyword Clusters

| Target Keyword | Intent | Priority | Target Page |
|----------------|--------|----------|-------------|
| CBSE school in Hyderabad | Navigational | **P1 — Critical** | Home |
| best school in Hyderabad for CBSE | Commercial | **P1 — Critical** | Home / About |
| schools near me Hyderabad admissions 2026 | Transactional | **P1 — Critical** | Admissions |
| play school admissions Hyderabad 2026 | Transactional | **P1 — Critical** | Admissions |
| nursery admission Hyderabad | Transactional | **P1 — High** | Admissions |
| CBSE school fees in Hyderabad | Commercial | P2 — High | Admissions / FAQ |
| best school for class 1 Hyderabad | Commercial | P2 — High | Academics |
| safe school campus Hyderabad | Informational | P2 — Medium | Facilities |
| school with activity classes Hyderabad | Informational | P2 — Medium | Academics |
| top 10 schools in Hyderabad | Informational | P3 — Medium | Blog |

### 8.2 GEO — AI Search Optimization (7 Tactics)

Generative Engine Optimization (GEO) ensures the school appears when parents ask ChatGPT, Google SGE, or Perplexity: *"What are the best CBSE schools in Hyderabad?"*

1. **Entity Clarity** — Every page opens with: *"Springboard Indian School is a CBSE-affiliated school in Hyderabad, Telangana, offering classes from Play Group to Grade 7."* AI extracts entity facts from the first paragraph.

2. **FAQPage Schema on Every Key Page** — Add 5–8 structured FAQs per page using `FAQPage` JSON-LD schema. AI pulls answers directly to generate responses.

3. **Definitive, Encyclopaedic Tone** — Write authoritative statements, not marketing fluff: *"Springboard Indian School was established in [Year]..."* not *"We are a world-class school!"*

4. **Comparative Content** — Blog posts like *"CBSE vs ICSE: Which is Better for Hyderabad Students?"* train AI to associate expertise with the school.

5. **Local Landmark References** — Mention area landmarks: *"Located near [Landmark], [Area], Hyderabad"* — helps AI geo-locate the school for local queries.

6. **Long-Form Authority Pages** — 1,500+ word pages on key topics (admissions, academics) give AI more citable content.

7. **Wikipedia-Style Infobox on About Page** — A structured summary table (founded, curriculum, grades, address) mirrors how Wikipedia presents facts for AI extraction.

### 8.3 On-Page SEO Rules

- **Title tags**: `Primary Keyword | Springboard Indian School, Hyderabad` (under 60 chars)
- **Meta descriptions**: Include keyword + value proposition + CTA (under 155 chars)
- **H1**: One per page — contains primary keyword naturally
- **H2/H3 headings**: Use question format (*"Why Choose Springboard for Your Child?"*)
- **Internal links**: Every page links to Admissions at least once
- **Image SEO**: All images have descriptive `alt` text with location keyword; use WebP format
- **URL structure**: `/blog/cbse-vs-icse-hyderabad` — keyword-rich, hyphenated, lowercase
- **Core Web Vitals**: React lazy loading, image optimization, font preloading

---

## 9. Blog Content Calendar

12 launch posts strategically targeting parent search queries while building topical authority.

| # | Blog Title | Target Keyword | Conversion Rationale |
|---|-----------|----------------|---------------------|
| 1 | CBSE vs ICSE: Which Board is Right for Your Child in Hyderabad? (2026 Guide) | CBSE vs ICSE Hyderabad | Parents researching boards before admission |
| 2 | Top 10 Questions to Ask Before Choosing a School in Hyderabad | school admissions checklist Hyderabad | Decision-phase parents comparing schools |
| 3 | Why Early Childhood Education (Play Group to KG) Matters Most | early childhood education Hyderabad | Parents of 2–5 year olds searching for play schools |
| 4 | How to Prepare Your Child for Class 1 Admissions in Hyderabad | class 1 admission Hyderabad 2026 | High-intent parents of 5–6 year olds |
| 5 | What is Activity-Based Learning? How Springboard Does It Differently | activity based learning school Hyderabad | Differentiator content + trust builder |
| 6 | School Safety Standards: What Every Parent in Hyderabad Should Know | safe school Hyderabad CCTV | Safety-conscious parents — high trust signal |
| 7 | The Importance of Mother Tongue + English Balance in Early Schooling | bilingual education Hyderabad school | Culturally aware parents — highly shareable |
| 8 | How to Spot If Your Child is Ready for Play School (Signs by Age) | play school readiness Hyderabad | Nursery / Play Group admission leads |
| 9 | CBSE Curriculum Explained: Grade 1–7 Overview for Hyderabad Parents | CBSE curriculum grades Hyderabad | Broad awareness — attracts top-of-funnel traffic |
| 10 | School Visit Checklist: 15 Things to Observe During a School Tour | school visit checklist | Converts visitors who book campus tours |
| 11 | Co-Curricular vs Extra-Curricular: Why Both Matter for Child Development | co-curricular activities school | Topical authority + shareable |
| 12 | Admissions 2026–27 at Springboard: Dates, Process & Eligibility | Springboard school admissions 2026 | Direct conversion — highest intent |

---

## 10. Internal Linking Strategy

Every page links to at least two others — always including the Admissions page.

| From Page | Links To | Anchor Text |
|-----------|----------|-------------|
| **Home** | Admissions, About, Academics, Blog (3 posts) | "Apply Now", "Our Story", "Explore Programs" |
| **About** | Admissions (sidebar CTA), Academics, Testimonials | "Start the Admission Journey" |
| **Academics** | Admissions (grade-specific CTA), Facilities, Contact | "Apply for [Grade]", "See Our Facilities" |
| **Admissions** | Contact, FAQ (anchor), Blog (prep tips) | "Book a Visit", "Read Our FAQ" |
| **Facilities** | Admissions, Contact | "Apply Now", "Book a School Visit" |
| **Blog posts** | Admissions (end of every post), related post, Academics | "Apply for 2026–27", "Read Next" |
| **Events** | Gallery, Blog, Contact | "View Gallery", "Latest Updates" |
| **Gallery** | Admissions (floating CTA), Events, About | "Join Our School Family" |
| **Contact** | Admissions, Blog, Home | "Apply Online", "Read Our Blog" |

---

## 11. Sample Content: Home Page

### Hero Section

**H1 (Above the fold):**
> Where Every Child's Brilliance Finds Its Shine

**Sub-headline:**
> Springboard Indian School, Hyderabad — A CBSE school nurturing curious minds from Play Group to Grade 7. Academic excellence meets a safe, joyful childhood.

**Primary CTA:** `Apply for Admissions 2026–27` → `/admissions`
**Secondary CTA:** `Book a Free School Visit` → `/contact?type=visit`
**Trust signal:** ⭐ Trusted by 800+ Hyderabad families · 15 Years of Excellence

---

### Trust Bar (4 Stats)

| Stat | Label |
|------|-------|
| 800+ | Happy Students |
| 15+ Years | Of Excellence |
| 100% | CCTV Campus Safety |
| 40+ | Experienced Educators |

---

### Why Springboard — Value Propositions

**Section H2:** *Why Hyderabad Parents Choose Springboard for Their Children*

- **Holistic CBSE Curriculum** — We go beyond textbooks. Our curriculum blends academics, arts, sports, and life skills so every child develops into a complete individual.
- **Safe & Nurturing Campus** — From CCTV-monitored classrooms to trained counsellors, your child's safety and mental well-being are our highest priority.
- **Experienced, Caring Teachers** — Our faculty brings 10+ years of average experience and genuine passion for early childhood development.
- **Small Class Sizes** — With a maximum 25:1 student-teacher ratio, every child gets personalised attention — not just a seat in a classroom.
- **Activity-Based Learning** — Science labs, art rooms, music classes, and outdoor play are built into daily schedules — not afterthoughts.

---

### Admissions CTA Block (Full-width banner)

> **Admissions 2026–27 Are Now Open**
>
> Seats are filling fast for Play Group, Nursery, KG, and Classes 1–7.
> Don't miss your child's place at Hyderabad's most caring school.
>
> `[ Apply Now — It Takes 2 Minutes ]`   `[ Book a School Visit ]`

---

### Testimonials

> *"We visited 6 schools before choosing Springboard. The moment we walked in, the warmth of the staff and the cleanliness of the campus told us everything. Two years later, our son has blossomed — not just academically but in confidence and creativity. Best decision we made."*
> — **Priya Sharma**, Parent of Aarav (Grade 3)

> *"As first-time parents, we were nervous about choosing a play school. The teachers at Springboard called us every week in the first month to share how Ananya was settling in. That kind of communication and care is rare. Highly recommended!"*
> — **Rajesh & Sunita Reddy**, Parents of Ananya (Nursery)

> *"The academic standards are high but the school never compromises on fun. Zara participates in science exhibitions, dance performances, and sports — and her grades are the best they've ever been. Springboard truly gets the balance right."*
> — **Mohammed Farhan**, Parent of Zara (Grade 5)

---

### Home Page FAQ (FAQPage Schema)

**Q: Which board does Springboard Indian School follow?**
A: Springboard Indian School is affiliated with the Central Board of Secondary Education (CBSE), one of India's most respected and widely recognised curriculum boards.

**Q: What grades does Springboard Indian School offer?**
A: We offer classes from Play Group (age 2.5+) through Grade 7, providing a continuous, consistent learning environment for your child's most formative years.

**Q: Where is Springboard Indian School located in Hyderabad?**
A: Springboard Indian School is located in [Area], Hyderabad, Telangana. The campus is easily accessible from [nearby areas] and offers school bus service across [zones].

**Q: When do admissions open for 2026–27?**
A: Admissions for the academic year 2026–27 are now open. We recommend applying early as seats are limited, especially for Nursery, KG, and Class 1.

**Q: Does Springboard Indian School have CCTV surveillance?**
A: Yes. Our entire campus — classrooms, corridors, entry/exit points, and playground — is monitored 24/7 with CCTV cameras. The safety of every child is our absolute priority.

**Q: How do I apply for admission to Springboard Indian School?**
A: You can apply online through our Admissions page, or visit the school campus between 9 AM and 2 PM on weekdays. Our admissions team will guide you through the process.

---

## 12. Sample Content: About Page

**Page Title:** `About Springboard Indian School — Our Story, Values & Vision | Hyderabad`
**Meta Description:** Learn about Springboard Indian School — Hyderabad's trusted CBSE school for Play Group to Grade 7. Discover our 15-year journey, experienced faculty, and child-first philosophy.
**H1:** `About Springboard Indian School, Hyderabad`
**URL:** `/about`
**Target Word Count:** 1,200–1,500 words

---

### Our Story

**H2:** Our 15-Year Journey of Nurturing Young Minds

Springboard Indian School was founded in [Year] with a simple but powerful belief: that every child arrives in this world with a unique spark — and the role of a great school is to fan that spark into a brilliant flame.

What began as a small community school in [Area], Hyderabad has grown into one of the neighbourhood's most trusted educational institutions — home to 800+ students, 40+ dedicated educators, and a campus that rings with laughter, curiosity, and discovery every single day.

We are CBSE-affiliated, but we are so much more than a board school. We are a community. We are a safe haven. We are the place where shy children find their voice, curious children find their path, and every child finds their confidence.

---

### Vision, Mission & Values

| | |
|---|---|
| **Our Vision** | To be Hyderabad's most trusted learning community — where academic excellence and human values grow together, and every child is seen, heard, and celebrated. |
| **Our Mission** | To provide a safe, joyful, and intellectually stimulating environment where children from Play Group to Grade 7 develop the knowledge, character, and confidence to thrive in a changing world. |
| **Our Values** | Curiosity · Compassion · Integrity · Joy · Excellence |

---

### The Springboard Method

**H2:** How We Teach Differently

Most schools teach children *what* to think. At Springboard, we teach children *how* to think.

- **Play-Based Early Learning (Play Group – KG):** Structured play, storytelling, sensory activities, and music build foundational skills in reading, numeracy, and social interaction.
- **Inquiry-Based Learning (Grades 1–4):** Students ask questions, form hypotheses, and discover answers — building scientific thinking for life.
- **Project-Based Learning (Grades 5–7):** Real-world problems, collaborative projects, and cross-curricular investigations. Students don't just learn content — they learn to apply it.

---

### Wikipedia-Style School Infobox

| Field | Detail |
|-------|--------|
| Full Name | Springboard Indian School |
| Location | [Area], Hyderabad, Telangana — 500 0XX |
| Established | [Year] |
| Affiliation | CBSE |
| Grades | Play Group, Nursery, KG, Classes 1–7 |
| Medium | English |
| Students | 800+ |
| Faculty | 40+ educators |
| Hours | Monday–Friday, 8:00 AM–3:30 PM |
| Contact | +91-XXXXXXXXXX |
| Website | springboardindianschool.in |

---

## 13. Sample Content: Admissions Page

**Page Title:** `Admissions 2026–27 Open | Springboard Indian School, Hyderabad — Apply Now`
**Meta Description:** Apply for admissions at Springboard Indian School, Hyderabad. CBSE school for Play Group to Grade 7. Limited seats available for 2026–27. Enquire today!
**H1:** `Admissions 2026–27 at Springboard Indian School, Hyderabad`
**URL:** `/admissions`

---

> ⚠️ **NOTICE:** Admissions for 2026–27 are now open. Seats are limited — especially for Nursery, KG, and Grade 1. Apply early to secure your child's place.

Springboard Indian School welcomes new students for the academic year 2026–27 across all grades — from Play Group (age 2.5 years) to Grade 7. Our admissions process is transparent, simple, and designed with parent convenience in mind.

---

### Grade-Wise Seat Availability

| Class | Age (as of June 1) | Seats Available | Status |
|-------|-------------------|-----------------|--------|
| Play Group | 2.5 – 3.5 years | 25 | 🟢 Open |
| Nursery | 3.5 – 4.5 years | 30 | 🟡 Limited |
| LKG (KG I) | 4.5 – 5.5 years | 30 | 🟢 Open |
| UKG (KG II) | 5.5 – 6.5 years | 25 | 🟢 Open |
| Grade 1 | 6.5 years+ | 20 | 🟡 Limited |
| Grades 2–7 | Age appropriate | 15 per class | 🟢 Select Seats |

---

### 4-Step Admission Process

**Step 1: Submit Online Enquiry**
Fill out the simple form on this page with your child's name, grade applying for, and your contact number. Takes 2 minutes.

**Step 2: Schedule a School Visit**
Our admissions coordinator will call you within 24 hours to schedule a campus tour. Come see the school, meet the teachers, and feel the Springboard difference firsthand.

**Step 3: Application & Documentation**
Complete the admission application form and submit required documents: birth certificate, previous school transfer certificate (if applicable), photographs, and immunisation records.

**Step 4: Confirmation & Fee Payment**
Upon selection, receive a formal admission offer letter. Pay the initial fees to secure your child's seat. Welcome to the Springboard family!

---

### Documents Required

- Child's Birth Certificate (original + photocopy)
- 2 recent passport-size photographs of the child
- Previous school Transfer Certificate (Grade 2 and above)
- Previous year's report card (Grade 2 and above)
- Proof of residence (Aadhaar card / utility bill)
- Parent / Guardian Aadhaar card (photocopy)
- Immunisation / vaccination record

---

### Admissions FAQ

**Q: Is there an entrance test for admission?**
A: For Play Group, Nursery, and KG — No. We believe children at this age should be welcomed, not tested. For Classes 1–7, a friendly interaction session is conducted to understand the child's current learning level — it is not a competitive test.

**Q: What is the fee structure?**
A: Our fee structure is transparent and available upon request during your school visit or through the admissions office. We offer a competitive, value-driven structure compared to other CBSE schools in Hyderabad.

**Q: Does Springboard provide school bus facility?**
A: Yes, we provide a safe, GPS-tracked school bus service covering major areas around [locality]. Please enquire with the admissions office for routes and availability.

**Q: Can I apply online?**
A: Yes! Fill out the enquiry form on this page. Our admissions team will contact you within 24 hours to guide you through the next steps.

**Q: Is there a sibling discount?**
A: Yes, Springboard offers a sibling discount for families with more than one child enrolled. Please ask our admissions team for current offers.

---

## 14. Deployment Guide

### 14.1 Production Server Setup (Ubuntu 22.04)

```bash
# Install system dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3.12 python3.12-venv python3-pip \
  mysql-server redis-server nginx git nodejs npm

# Clone and set up backend
cd /var/www
git clone https://github.com/your-org/springboard-backend.git
cd springboard-backend
python3.12 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Environment setup
cp .env.example .env  # → fill in DB, Redis, email, secret key
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser

# Build frontend
cd /var/www/springboard-frontend
npm ci && npm run build
# Dist files served from /var/www/springboard-frontend/dist
```

### 14.2 Gunicorn Service (`/etc/systemd/system/springboard.service`)

```ini
[Unit]
Description=Springboard Django Gunicorn
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/springboard-backend
ExecStart=/var/www/springboard-backend/.venv/bin/gunicorn \
    config.wsgi:application \
    --workers 4 \
    --worker-class gthread \
    --threads 2 \
    --bind unix:/run/springboard.sock \
    --log-level info
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

### 14.3 Nginx Configuration

```nginx
# API + Admin
server {
    listen 80;
    server_name api.springboardindianschool.in;

    location / {
        proxy_pass http://unix:/run/springboard.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /media/ {
        alias /var/www/springboard-backend/media/;
        expires 1y;
        add_header Cache-Control "public";
    }

    location /static/ {
        alias /var/www/springboard-backend/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# React Frontend
server {
    listen 80;
    server_name springboardindianschool.in www.springboardindianschool.in;
    root /var/www/springboard-frontend/dist;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files $uri $uri/ /index.html;   # SPA fallback
    }

    location ~* \.(js|css|png|jpg|webp|woff2|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 14.4 Celery Worker Service

```bash
# /etc/systemd/system/springboard-celery.service
[Service]
WorkingDirectory=/var/www/springboard-backend
ExecStart=/var/www/springboard-backend/.venv/bin/celery \
    -A config worker -l info --concurrency=4
User=www-data
Restart=on-failure
```

### 14.5 Pre-Launch Checklist

- [ ] SSL certificate via Certbot: `certbot --nginx -d springboardindianschool.in`
- [ ] Cloudflare proxy enabled (orange cloud) on DNS
- [ ] Django `DEBUG=False` and `ALLOWED_HOSTS` set correctly in production
- [ ] All images compressed to WebP, below 200KB for hero images
- [ ] Sitemap submitted to Google Search Console
- [ ] Google Business Profile claimed and optimised
- [ ] Google Analytics 4 installed with conversion tracking on enquiry form
- [ ] Facebook Pixel on `/admissions` for retargeting
- [ ] Run Lighthouse — target 90+ all categories
- [ ] Test all enquiry forms on mobile (360px+)
- [ ] Verify `robots.txt` is correct and `sitemap.xml` is accessible
- [ ] CORS settings locked to production domain only

### 14.6 Post-Launch SEO Checklist

- [ ] Submit sitemap.xml to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Claim Google Knowledge Panel (via structured data)
- [ ] Add school to SchoolMyKids, AskIITians, Myclassboard directories
- [ ] Set up GSC alerts for coverage errors and Core Web Vitals regressions
- [ ] Begin publishing 1 blog post per week from content calendar
- [ ] Monitor INP, LCP, CLS monthly via CrUX dashboard

---

## 15. Future Integration Roadmap

| Phase | Feature | Description | Timeline |
|-------|---------|-------------|----------|
| **1 (Now)** | Public Website + CMS + Admin | Dynamic website, enquiry forms, blog, gallery, events, Django admin | Month 1–2 |
| 2 | Parent Portal Login | Parent accounts: notices, attendance summary, exam results, fee status | Month 3–4 |
| 3 | Online Fee Payment | Razorpay / PayU integration with auto-receipts and due-date reminders | Month 4–5 |
| 4 | Student Dashboard | Homework, timetable, library, achievements — React frontend | Month 6 |
| 5 | SMS / WhatsApp Automation | Celery-powered: attendance alerts, fee reminders, exam notifications | Month 5–6 |
| 6 | Mobile App | React Native app consuming the DRF API (iOS + Android) | Month 7–9 |
| 7 | Full ERP | HR module, inventory, fee accounting, report card generation | Year 2 |

---

> **This blueprint is your complete digital foundation.**
> Build it right the first time — and Springboard Indian School will own Hyderabad's school search results for years to come.

---

*Springboard Indian School, Hyderabad · Version 2.0 · April 2026 · Confidential*

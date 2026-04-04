"""
Main URL configuration for Springboard Indian School backend.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Django Admin
    path('django-admin/', admin.site.urls),

    # API Auth (JWT)
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Public API routes
    path('api/blog/', include('apps.blog.urls')),
    path('api/events/', include('apps.events.urls')),
    path('api/gallery/', include('apps.gallery.urls')),
    path('api/testimonials/', include('apps.testimonials.urls')),

    # Public form
    path('api/enquiries/', include('apps.enquiries.urls')),

    # Admin API routes (protected)
    path('api/admin/', include('apps.blog.admin_urls', namespace='admin_blog')),
    path('api/admin/', include('apps.events.admin_urls', namespace='admin_events')),
    path('api/admin/', include('apps.gallery.admin_urls', namespace='admin_gallery')),
    path('api/admin/', include('apps.enquiries.admin_urls', namespace='admin_enquiries')),
    path('api/admin/', include('apps.testimonials.admin_urls', namespace='admin_testimonials')),
    path('api/admin/', include('apps.seo.urls', namespace='admin_seo')),
    path('api/admin/', include('apps.settings_app.urls', namespace='admin_settings')),
    path('api/admin/', include('apps.core.urls', namespace='admin_core')),
    path('api/admin/', include('apps.media_library.urls', namespace='media_library')),

    # API Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

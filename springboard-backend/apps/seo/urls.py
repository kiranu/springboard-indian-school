app_name = 'admin_seo'

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SeoPageAdminViewSet

router = DefaultRouter()
router.register('seo', SeoPageAdminViewSet, basename='admin-seo')

urlpatterns = [path('', include(router.urls))]

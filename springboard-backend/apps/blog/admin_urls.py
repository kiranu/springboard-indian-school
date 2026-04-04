app_name = 'admin_blog'

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogAdminViewSet

router = DefaultRouter()
router.register('blogs', BlogAdminViewSet, basename='admin-blog')

urlpatterns = [
    path('', include(router.urls)),
]

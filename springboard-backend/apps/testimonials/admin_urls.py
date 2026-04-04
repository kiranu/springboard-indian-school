app_name = 'admin_testimonials'

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TestimonialAdminViewSet

router = DefaultRouter()
router.register('testimonials', TestimonialAdminViewSet, basename='admin-testimonial')

urlpatterns = [path('', include(router.urls))]

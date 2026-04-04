from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TestimonialPublicViewSet

router = DefaultRouter()
router.register('', TestimonialPublicViewSet, basename='testimonial')

urlpatterns = [path('', include(router.urls))]

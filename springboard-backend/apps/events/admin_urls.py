app_name = 'admin_events'

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventAdminViewSet

router = DefaultRouter()
router.register('events', EventAdminViewSet, basename='admin-event')

urlpatterns = [path('', include(router.urls))]

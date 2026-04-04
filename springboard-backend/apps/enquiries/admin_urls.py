app_name = 'admin_enquiries'

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnquiryAdminViewSet

router = DefaultRouter()
router.register('enquiries', EnquiryAdminViewSet, basename='admin-enquiry')

urlpatterns = [path('', include(router.urls))]

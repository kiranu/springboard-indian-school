app_name = 'admin_settings'

from django.urls import path
from .views import SiteSettingsAdminView

urlpatterns = [
    path('settings/', SiteSettingsAdminView.as_view(), name='settings'),
]

app_name = 'admin_settings'

from django.urls import path
from .views import SiteSettingsAdminView, SiteSettingsPublicView

urlpatterns = [
    path('settings/', SiteSettingsAdminView.as_view(), name='settings'),
    path('settings/public/', SiteSettingsPublicView.as_view(), name='settings-public'),
]

app_name = 'public_settings'

from django.urls import path
from .views import SiteSettingsPublicView

urlpatterns = [
    path('', SiteSettingsPublicView.as_view(), name='settings-public'),
]

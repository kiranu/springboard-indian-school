from django.urls import path
from .views import EnquiryCreateViewSet

urlpatterns = [
    path('', EnquiryCreateViewSet.as_view({'post': 'create'}), name='enquiry-create'),
]

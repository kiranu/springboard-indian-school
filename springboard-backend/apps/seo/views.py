from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import SeoPage
from .serializers import SeoPageSerializer


class SeoPagePublicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SeoPage.objects.all()
    serializer_class = SeoPageSerializer
    permission_classes = [AllowAny]
    lookup_field = 'page_key'


class SeoPageAdminViewSet(viewsets.ModelViewSet):
    queryset = SeoPage.objects.all()
    serializer_class = SeoPageSerializer
    permission_classes = [IsAdminUser]

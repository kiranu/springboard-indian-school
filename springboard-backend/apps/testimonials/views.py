from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialPublicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_published=True)
    serializer_class = TestimonialSerializer


class TestimonialAdminViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['parent_name', 'child_name']

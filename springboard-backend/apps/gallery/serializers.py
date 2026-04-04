from rest_framework import serializers
from .models import GalleryItem


class GalleryItemSerializer(serializers.ModelSerializer):
    # Allow saving gallery item before an image URL is assigned
    image_url = serializers.CharField(allow_blank=True, default='')

    class Meta:
        model = GalleryItem
        fields = '__all__'
        read_only_fields = ['created_at']

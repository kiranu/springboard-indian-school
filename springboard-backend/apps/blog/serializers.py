from rest_framework import serializers
from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    # Allow saving a draft with no content yet
    content = serializers.CharField(allow_blank=True, default='')
    # Allow empty featured_image (stored as '' not a full URL during drafts)
    featured_image = serializers.CharField(allow_blank=True, default='')

    class Meta:
        model = Blog
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

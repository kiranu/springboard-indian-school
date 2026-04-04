from rest_framework import serializers
from .models import MediaFile


class MediaFileSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    size_display = serializers.SerializerMethodField()

    class Meta:
        model = MediaFile
        fields = ['id', 'name', 'file', 'url', 'file_type', 'mime_type',
                  'size', 'size_display', 'alt_text', 'uploaded_at']
        read_only_fields = ['uploaded_at', 'file_type', 'url', 'size_display']

    def get_url(self, obj):
        request = self.context.get('request')
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return obj.file.url if obj.file else ''

    def get_size_display(self, obj):
        return obj.size_display

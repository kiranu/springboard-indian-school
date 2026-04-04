from django.contrib import admin
from .models import MediaFile


@admin.register(MediaFile)
class MediaFileAdmin(admin.ModelAdmin):
    list_display = ['name', 'file_type', 'size_display', 'uploaded_at']
    list_filter = ['file_type']
    search_fields = ['name', 'alt_text']
    readonly_fields = ['uploaded_at', 'size', 'mime_type', 'file_type']

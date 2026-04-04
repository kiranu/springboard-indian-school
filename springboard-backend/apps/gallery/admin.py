from django.contrib import admin
from .models import GalleryItem

@admin.register(GalleryItem)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_published', 'sort_order']
    list_filter = ['category', 'is_published']
    list_editable = ['is_published', 'sort_order']

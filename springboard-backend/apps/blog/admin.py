from django.contrib import admin
from .models import Blog

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'author', 'is_published', 'created_at']
    list_filter = ['is_published', 'category']
    search_fields = ['title', 'author']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_published']

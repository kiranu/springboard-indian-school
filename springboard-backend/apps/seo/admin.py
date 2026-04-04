from django.contrib import admin
from .models import SeoPage

@admin.register(SeoPage)
class SeoPageAdmin(admin.ModelAdmin):
    list_display = ['page_label', 'page_key', 'updated_at']

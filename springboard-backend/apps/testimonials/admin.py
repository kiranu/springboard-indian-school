from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['parent_name', 'child_name', 'grade', 'rating', 'is_published']
    list_filter = ['is_published', 'rating']
    list_editable = ['is_published']

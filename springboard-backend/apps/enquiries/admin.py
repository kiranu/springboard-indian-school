from django.contrib import admin
from .models import Enquiry

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ['parent_name', 'child_name', 'grade', 'phone', 'status', 'created_at']
    list_filter = ['status', 'grade']
    search_fields = ['parent_name', 'child_name', 'email', 'phone']
    list_editable = ['status']
    readonly_fields = ['created_at', 'updated_at']

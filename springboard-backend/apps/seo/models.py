from django.db import models


class SeoPage(models.Model):
    page_key = models.CharField(max_length=50, unique=True)
    page_label = models.CharField(max_length=100)
    meta_title = models.CharField(max_length=120, blank=True)
    meta_description = models.TextField(max_length=300, blank=True)
    og_title = models.CharField(max_length=120, blank=True)
    og_description = models.TextField(max_length=300, blank=True)
    og_image = models.URLField(blank=True)
    keywords = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'SEO Page'

    def __str__(self):
        return self.page_label

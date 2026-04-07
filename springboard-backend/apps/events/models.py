from django.db import models
from django.utils.text import slugify


class Event(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField(blank=True)
    content = models.TextField(blank=True)
    event_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=200, default='School Campus')
    featured_image = models.URLField(blank=True)
    is_published = models.BooleanField(default=False)
    # SEO fields
    meta_title = models.CharField(max_length=120, blank=True)
    meta_description = models.TextField(max_length=300, blank=True)
    keywords = models.TextField(blank=True)
    og_image = models.URLField(blank=True)
    canonical_url = models.URLField(blank=True)
    # GEO / structured data
    geo_region = models.CharField(max_length=100, blank=True, help_text='e.g. IN-TG for Telangana, India')
    geo_placename = models.CharField(max_length=200, blank=True, help_text='e.g. Hyderabad')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-event_date', '-created_at']
        verbose_name = 'Event'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

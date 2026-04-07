from django.db import models
from django.utils.text import slugify


class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    category = models.CharField(max_length=100, default='School Life')
    author = models.CharField(max_length=100, default='Admin')
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    featured_image = models.URLField(blank=True)
    is_published = models.BooleanField(default=False)
    # SEO fields
    meta_title = models.CharField(max_length=120, blank=True)
    meta_description = models.TextField(max_length=300, blank=True)
    keywords = models.TextField(blank=True)
    og_image = models.URLField(blank=True)
    canonical_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Blog Post'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

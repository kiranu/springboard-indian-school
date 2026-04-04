from django.db import models


class GalleryItem(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default='Campus')
    image_url = models.URLField()
    image_file = models.ImageField(upload_to='gallery/', blank=True, null=True)
    is_published = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['sort_order', '-created_at']
        verbose_name = 'Gallery Item'

    def __str__(self):
        return self.title

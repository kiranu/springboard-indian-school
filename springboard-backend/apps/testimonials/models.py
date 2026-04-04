from django.db import models


class Testimonial(models.Model):
    parent_name = models.CharField(max_length=200)
    child_name = models.CharField(max_length=200, blank=True)
    grade = models.CharField(max_length=50, blank=True)
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    photo_url = models.URLField(blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.parent_name} ({self.rating}★)"

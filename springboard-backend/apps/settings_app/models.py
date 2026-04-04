from django.db import models


class SiteSettings(models.Model):
    """Singleton model for site-wide settings."""
    school_name = models.CharField(max_length=200, default='Springboard Indian School')
    tagline = models.CharField(max_length=300, default="Where Every Child's Journey Begins")
    address = models.TextField(default='Survey No. 123, Kondapur, Hyderabad, Telangana 500084')
    phone_primary = models.CharField(max_length=20, blank=True)
    phone_secondary = models.CharField(max_length=20, blank=True)
    email_primary = models.EmailField(blank=True)
    email_admissions = models.EmailField(blank=True)
    whatsapp_number = models.CharField(max_length=20, blank=True)
    google_maps_embed = models.TextField(blank=True)
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    admission_open = models.BooleanField(default=True)
    seats_available = models.CharField(max_length=10, default='12')
    announcement_bar = models.CharField(max_length=400, blank=True)
    announcement_enabled = models.BooleanField(default=True)
    academic_year = models.CharField(max_length=10, default='2026-27')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def save(self, *args, **kwargs):
        self.pk = 1  # Force singleton
        super().save(*args, **kwargs)

    @classmethod
    def get(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return 'Site Settings'

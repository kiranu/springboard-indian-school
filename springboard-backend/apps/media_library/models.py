import os
from django.db import models


def upload_to(instance, filename):
    """Organise uploads into subfolders by file type."""
    ext = filename.rsplit('.', 1)[-1].lower()
    if ext in ('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'):
        folder = 'images'
    elif ext in ('mp4', 'mov', 'avi', 'mkv', 'webm'):
        folder = 'videos'
    elif ext in ('mp3', 'wav', 'ogg', 'm4a'):
        folder = 'audio'
    elif ext in ('pdf',):
        folder = 'pdfs'
    elif ext in ('doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'):
        folder = 'documents'
    else:
        folder = 'misc'
    return f'library/{folder}/{filename}'


class MediaFile(models.Model):
    FILE_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('pdf', 'PDF'),
        ('document', 'Document'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    file = models.FileField(upload_to=upload_to)
    file_type = models.CharField(max_length=20, choices=FILE_TYPE_CHOICES, default='other')
    mime_type = models.CharField(max_length=100, blank=True)
    size = models.PositiveBigIntegerField(default=0, help_text='File size in bytes')
    alt_text = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'Media File'

    def save(self, *args, **kwargs):
        if self.file and not self.name:
            self.name = os.path.basename(self.file.name)
        # Auto-detect file_type from extension
        if self.file:
            ext = str(self.file.name).rsplit('.', 1)[-1].lower()
            if ext in ('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'):
                self.file_type = 'image'
            elif ext in ('mp4', 'mov', 'avi', 'mkv', 'webm'):
                self.file_type = 'video'
            elif ext in ('mp3', 'wav', 'ogg', 'm4a'):
                self.file_type = 'audio'
            elif ext == 'pdf':
                self.file_type = 'pdf'
            elif ext in ('doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'):
                self.file_type = 'document'
            else:
                self.file_type = 'other'
        super().save(*args, **kwargs)

    @property
    def url(self):
        if self.file:
            return self.file.url
        return ''

    @property
    def size_display(self):
        if self.size < 1024:
            return f'{self.size} B'
        elif self.size < 1024 * 1024:
            return f'{self.size / 1024:.1f} KB'
        else:
            return f'{self.size / (1024 * 1024):.1f} MB'

    def __str__(self):
        return self.name

import os
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import MediaFile
from .serializers import MediaFileSerializer


class MediaFileViewSet(viewsets.ModelViewSet):
    queryset = MediaFile.objects.all()
    serializer_class = MediaFileSerializer
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['file_type']
    search_fields = ['name', 'alt_text']
    ordering_fields = ['uploaded_at', 'name', 'size']

    def create(self, request, *args, **kwargs):
        """Handle single or multiple file uploads."""
        files = request.FILES.getlist('file')
        if not files:
            return Response({'error': 'No files provided.'}, status=status.HTTP_400_BAD_REQUEST)

        results = []
        for f in files:
            data = {
                'name': request.data.get('name', f.name),
                'alt_text': request.data.get('alt_text', ''),
                'size': f.size,
                'mime_type': f.content_type or '',
            }
            serializer = self.get_serializer(data={**data, 'file': f})
            serializer.is_valid(raise_exception=True)
            serializer.save(size=f.size, mime_type=f.content_type or '')
            results.append(serializer.data)

        if len(results) == 1:
            return Response(results[0], status=status.HTTP_201_CREATED)
        return Response(results, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Delete the actual file from disk
        if instance.file:
            try:
                if os.path.isfile(instance.file.path):
                    os.remove(instance.file.path)
            except Exception:
                pass
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework import viewsets, status, filters
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.core.mail import send_mail
from .models import Enquiry
from .serializers import EnquirySerializer, EnquiryAdminSerializer


class EnquiryCreateViewSet(viewsets.GenericViewSet):
    """Public endpoint — anyone can submit an enquiry."""
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()

        # Send notification email (non-blocking in production via Celery)
        try:
            send_mail(
                subject=f"New Enquiry: {enquiry.parent_name} – {enquiry.child_name}",
                message=(
                    f"New admission enquiry received.\n\n"
                    f"Parent: {enquiry.parent_name}\n"
                    f"Child: {enquiry.child_name}\n"
                    f"Grade: {enquiry.grade}\n"
                    f"Phone: {enquiry.phone}\n"
                    f"Email: {enquiry.email}\n"
                    f"Message: {enquiry.message}\n\n"
                    f"Login to admin panel to manage this enquiry."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMINS_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass

        return Response({'message': 'Thank you! We will contact you shortly.'}, status=status.HTTP_201_CREATED)


class EnquiryAdminViewSet(viewsets.ModelViewSet):
    """Admin API — full access to enquiries."""
    queryset = Enquiry.objects.all()
    serializer_class = EnquiryAdminSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'grade']
    search_fields = ['parent_name', 'child_name', 'email', 'phone']
    ordering_fields = ['created_at', 'status']

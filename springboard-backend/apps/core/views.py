from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from apps.enquiries.models import Enquiry
from apps.blog.models import Blog
from apps.events.models import Event
from apps.gallery.models import GalleryItem
from apps.testimonials.models import Testimonial


class DashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        recent_enquiries = Enquiry.objects.order_by('-created_at')[:5]
        data = {
            'stats': {
                'enquiries': Enquiry.objects.count(),
                'newEnquiries': Enquiry.objects.filter(status='new').count(),
                'blogs': Blog.objects.count(),
                'events': Event.objects.count(),
                'gallery': GalleryItem.objects.count(),
                'testimonials': Testimonial.objects.count(),
            },
            'recent_enquiries': [
                {
                    'id': e.id,
                    'parent_name': e.parent_name,
                    'child_name': e.child_name,
                    'grade': e.grade,
                    'phone': e.phone,
                    'created_at': e.created_at.strftime('%Y-%m-%d'),
                    'status': e.status,
                }
                for e in recent_enquiries
            ],
        }
        return Response(data)

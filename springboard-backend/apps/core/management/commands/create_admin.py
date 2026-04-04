"""
Custom management command to create an admin superuser quickly.
Usage: python manage.py create_admin
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Create a default superuser for Springboard admin panel'

    def add_arguments(self, parser):
        parser.add_argument('--username', default='admin', help='Admin username (default: admin)')
        parser.add_argument('--password', default='admin@123', help='Admin password (default: admin@123)')
        parser.add_argument('--email', default='admin@springboard.edu.in', help='Admin email')

    def handle(self, *args, **options):
        username = options['username']
        password = options['password']
        email = options['email']

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(
                f'User "{username}" already exists. Use Django admin to reset password if needed.'
            ))
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(
            f'\n✅ Superuser created successfully!\n'
            f'   Username : {username}\n'
            f'   Password : {password}\n'
            f'   Login at : http://localhost:5173/admin/login\n'
        ))

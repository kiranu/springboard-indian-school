"""
Sandbox test settings — overrides MySQL with SQLite so we can run
the server without a local MySQL instance.
"""
from .settings import *  # noqa

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': '/sessions/cool-peaceful-galileo/springboard_test.db',
    }
}

# Allow all hosts for local sandbox testing
ALLOWED_HOSTS = ['*']

# Keep debug on
DEBUG = True

# Disable whitenoise for dev
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

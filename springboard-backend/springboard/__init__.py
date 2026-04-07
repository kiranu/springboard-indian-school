# Use PyMySQL as a drop-in replacement for mysqlclient (no C libraries needed)
# try:
#     import pymysql
#     pymysql.install_as_MySQLdb()
# except ImportError:
#     pass  # mysqlclient is installed directly — that's fine too

# Celery is optional — only load if redis/celery are installed
try:
    from .celery import app as celery_app
    __all__ = ('celery_app',)
except ImportError:
    pass

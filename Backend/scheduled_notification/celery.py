import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'notification_project.settings')
app = Celery('notification_project')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# celery -A notification_project worker --loglevel=debug
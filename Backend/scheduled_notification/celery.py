import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scheduled_notification.settings')
app = Celery('notification_project')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# celery -A scheduled_notification worker --loglevel=debug
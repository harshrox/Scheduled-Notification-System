from django.db import models

class Subscription(models.Model):
    FORMAT_CHOICES = [
        ('PDF', 'PDF'),
        ('HTML', 'HTML'),
        ('BOTH', 'Both'),
    ]
    start_date = models.DateField()
    end_date = models.DateField()
    report_format = models.CharField(max_length=10, choices=FORMAT_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

class ReportHistory(models.Model):
    sent_date = models.DateField()
    format_sent = models.CharField(max_length=10)
    status = models.CharField(max_length=20, default='Sent')
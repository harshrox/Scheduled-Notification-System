from django.core.management.base import BaseCommand
from app.models import Subscription, ReportHistory
from datetime import date, timedelta
import random

class Command(BaseCommand):
    help = 'Seed dummy data for Subscriptions and ReportHistory'

    def handle(self, *args, **kwargs):
        formats = ['PDF', 'HTML', 'BOTH']
        statuses = ['Sent', 'Failed', 'Pending']

        # Clear existing data
        Subscription.objects.all().delete()
        ReportHistory.objects.all().delete()

        # 3 dummy subscriptions
        for _ in range(3):
            Subscription.objects.create(
                start_date=date.today() - timedelta(days=random.randint(10, 30)),
                end_date=date.today() + timedelta(days=random.randint(10, 60)),
                report_format=random.choice(formats),
                is_active=random.choice([True, False])
            )

        # 3 dummy report history entries
        for i in range(3):
            ReportHistory.objects.create(
                sent_date=date.today() - timedelta(days=i),
                format_sent=random.choice(formats),
                status=random.choice(statuses)
            )

        self.stdout.write(self.style.SUCCESS('Dummy data seeded successfully!'))

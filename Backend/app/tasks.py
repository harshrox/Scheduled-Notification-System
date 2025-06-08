from celery import shared_task
from .models import Subscription, ReportHistory
from .pdf_generator import generate_pdf_report
from .html_generator import generate_html_report
from .email_service import send_email  
import datetime

@shared_task
def send_daily_reports():
    print("Task triggered")
    today = datetime.date.today()
    subscriptions = Subscription.objects.filter(
        is_active=True, start_date__lte=today, end_date__gte=today
    )
    print(f"Found {subscriptions.count()} subscriptions for today")

    for sub in subscriptions:
        pdf = generate_pdf_report() if sub.report_format in ['PDF', 'BOTH'] else None
        html = generate_html_report() if sub.report_format in ['HTML', 'BOTH'] else None
        print(f"Sending email for format: {sub.report_format}")
        send_email('test@example.com', pdf=pdf, html=html)
        ReportHistory.objects.create(sent_date=today, format_sent=sub.report_format)

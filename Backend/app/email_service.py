from django.core.mail import EmailMessage

def send_email(user_email, pdf=None, html=None):
    msg = EmailMessage("Daily Report", "Attached is your daily report.", to=[user_email])
    if pdf:
        msg.attach('report.pdf', pdf.read(), 'application/pdf')
    if html:
        msg.attach('report.html', html.encode('utf-8'), 'text/html')
    msg.send()
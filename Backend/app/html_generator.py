from django.template.loader import render_to_string
import random

def generate_html_report():
    data = {
        'summary': "Daily Summary for today",
        'values': [random.randint(10, 100) for _ in range(7)]
    }
    return render_to_string("report_template.html", data)
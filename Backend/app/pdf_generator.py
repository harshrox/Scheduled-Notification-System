import matplotlib.pyplot as plt
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
import io
import random
import datetime

def generate_pdf_report():
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = [Paragraph("Daily Summary Report", styles['Title'])]

   
    dates = [f"Day {i+1}" for i in range(7)]
    values = [random.randint(10, 100) for _ in range(7)]
    plt.bar(dates, values)
    chart_buf = io.BytesIO()
    plt.savefig(chart_buf, format='PNG')
    chart_buf.seek(0)
    elements.append(Image(chart_buf, width=400, height=200))

    doc.build(elements)
    buffer.seek(0)
    return buffer
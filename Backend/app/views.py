from rest_framework import generics, status
from rest_framework.response import Response
from .models import Subscription, ReportHistory
from .serializers import SubscriptionSerializer, ReportHistorySerializer

from rest_framework.views import APIView
from django.http import FileResponse, HttpResponse
from .pdf_generator import generate_pdf_report
from .html_generator import generate_html_report

from notifications.tasks import send_daily_reports
from django.http import JsonResponse

class SubscribeView(generics.CreateAPIView):
    serializer_class = SubscriptionSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Subscribed!"}, status=200)
        return Response(serializer.errors, status=400)

class UnsubscribeView(generics.GenericAPIView):
    def post(self, request):
        Subscription.objects.filter(is_active=True).update(is_active=False)
        return Response({"message": "Unsubscribed."})

class ListSubscriptionsView(generics.ListAPIView):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.filter(is_active=True)

class HistoryView(generics.ListAPIView):
    serializer_class = ReportHistorySerializer
    queryset = ReportHistory.objects.all()

class PreviewPDFView(APIView):
    def get(self, request):
        pdf = generate_pdf_report()
        return FileResponse(pdf, as_attachment=True, filename="daily_report.pdf")

class PreviewHTMLView(APIView):
    def get(self, request):
        html_content = generate_html_report()
        return HttpResponse(html_content)

def trigger_task(request):
    send_daily_reports.delay()
    return JsonResponse({"message": "Task triggered"})
from django.urls import path
from . import views

urlpatterns = [
    path('subscribe/', views.SubscribeView.as_view()),
    path('unsubscribe/', views.UnsubscribeView.as_view()),
    path('subscriptions/', views.ListSubscriptionsView.as_view()),
    path('history/', views.HistoryView.as_view()),
    path('preview/pdf/', views.PreviewPDFView.as_view()),
    path('preview/html/', views.PreviewHTMLView.as_view()),
    path('trigger-task/', views.trigger_task),
]
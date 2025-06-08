import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription, ReportHistory, ApiResponse } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  subscribe(subscription: Subscription): Observable<ApiResponse<Subscription>> {
    return this.http.post<ApiResponse<Subscription>>(`${this.baseUrl}/subscribe/`, subscription);
  }

  unsubscribe(): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/unsubscribe/`, {});
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.baseUrl}/subscriptions/`);
  }

  getReportHistory(): Observable<ReportHistory[]> {
    return this.http.get<ReportHistory[]>(`${this.baseUrl}/history/`);
  }

  previewPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/preview/pdf/`, { responseType: 'blob' });
  }

  previewHtml(): Observable<string> {
    return this.http.get(`${this.baseUrl}/preview/html/`, { responseType: 'text' });
  }

  triggerTestEmail(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trigger-task/`);
  }
}
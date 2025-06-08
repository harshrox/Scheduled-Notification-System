export interface Subscription {
  id?: number;
  start_date: string;
  end_date: string;
  report_format: 'PDF' | 'HTML';
  is_active?: boolean;
  created_at?: string;
}

export interface ReportHistory {
  id: number;
  sent_date: string;
  format_sent: string;
  status: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { ReportHistory } from '../../models/notification.model';

@Component({
  selector: 'app-report-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-history.html',
  styleUrls: ['./report-history.css']
})
export class ReportHistoryComponent implements OnInit {
  history: ReportHistory[] = [];
  isLoading = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.isLoading = true;
    this.notificationService.getReportHistory().subscribe({
      next: (history) => {
        console.log('Fetched history:', history);
        this.history = history;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading history:', error);
        this.isLoading = false;
      }
    });

    
  }

  refresh() {
    this.loadHistory();
  }
}
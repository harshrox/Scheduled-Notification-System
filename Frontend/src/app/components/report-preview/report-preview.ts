import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-report-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-preview.html',
  styleUrls: ['./report-preview.css']
})
export class ReportPreviewComponent {
  htmlContent: SafeHtml | null = null;
  message = '';
  isLoading = false;

  constructor(
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ) {}

  previewPdf() {
    this.isLoading = true;
    this.notificationService.previewPdf().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.isLoading = false;
      },
      error: (error) => {
        this.message = 'Error loading PDF preview';
        this.isLoading = false;
      }
    });
  }

  previewHtml() {
    this.isLoading = true;
    this.notificationService.previewHtml().subscribe({
      next: (html) => {
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
        this.isLoading = false;
      },
      error: (error) => {
        this.message = 'Error loading HTML preview';
        this.isLoading = false;
      }
    });
  }

  triggerTestEmail() {
    this.isLoading = true;
    this.notificationService.triggerTestEmail().subscribe({
      next: (response) => {
        this.message = 'Test email triggered successfully!';
        this.isLoading = false;
      },
      error: (error) => {
        this.message = 'Error triggering test email';
        this.isLoading = false;
      }
    });
  }

  clearPreview() {
    this.htmlContent = null;
    this.message = '';
  }
}
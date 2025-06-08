import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from '../../models/notification.model';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription-form.html',
  styleUrls: ['./subscription-form.css']
})
export class SubscriptionFormComponent {
  subscription: Subscription = {
    start_date: '',
    end_date: '',
    report_format: 'PDF'
  };
  
  message = '';
  isLoading = false;

  constructor(private notificationService: NotificationService) {}

  onSubmit() {
    if (!this.subscription.start_date || !this.subscription.end_date) {
      this.message = 'Please select both start and end dates';
      return;
    }

    this.isLoading = true;
    this.notificationService.subscribe(this.subscription).subscribe({
      next: (response) => {
        this.message = 'Successfully subscribed to daily reports!';
        this.isLoading = false;
        this.resetForm();
      },
      error: (error) => {
        this.message = 'Error subscribing. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onUnsubscribe() {
    this.isLoading = true;
    this.notificationService.unsubscribe().subscribe({
      next: (response) => {
        this.message = 'Successfully unsubscribed from all notifications!';
        this.isLoading = false;
      },
      error: (error) => {
        this.message = 'Error unsubscribing. Please try again.';
        this.isLoading = false;
      }
    });
  }

  private resetForm() {
    this.subscription = {
      start_date: '',
      end_date: '',
      report_format: 'PDF'
    };
  }
}
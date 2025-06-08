import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from '../../models/notification.model';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-list.html',
  styleUrls: ['./subscription-list.css']
})
export class SubscriptionListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  isLoading = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.isLoading = true;
    this.notificationService.getSubscriptions().subscribe({
      next: (subscriptions) => {
        this.subscriptions = subscriptions;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading subscriptions:', error);
        this.isLoading = false;
      }
    });
  }

  refresh() {
    this.loadSubscriptions();
  }
}
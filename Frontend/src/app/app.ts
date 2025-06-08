import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list';
import { ReportPreviewComponent } from './components/report-preview/report-preview';
import { ReportHistoryComponent } from './components/report-history/report-history';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SubscriptionFormComponent,
    SubscriptionListComponent,
    ReportPreviewComponent,
    ReportHistoryComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Scheduled Notification System';
}
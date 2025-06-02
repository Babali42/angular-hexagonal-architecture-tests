import { Injectable } from '@angular/core';
import { BillingNotifier } from '../../domain/ports/billing-notifier.port';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BillingRestClient implements BillingNotifier {
  constructor(private http: HttpClient) {}

  stopInvoicingForSubscription(subscriptionId: string): void {
    this.http
      .post(`/api/billing/stop/${subscriptionId}`, {})
      .subscribe();
  }
}

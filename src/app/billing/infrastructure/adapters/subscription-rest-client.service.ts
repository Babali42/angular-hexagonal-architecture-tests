import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubscriptionProvider } from '../../domain/ports/subscription-provider.port';
import { SubscriptionDTO } from '../../../shared/types/subscription-dto';

@Injectable({ providedIn: 'root' })
export class SubscriptionRestClient implements SubscriptionProvider {
  constructor(private http: HttpClient) {}

  getActiveSubscriptionsForCustomer(customerId: string): Promise<SubscriptionDTO[] | undefined> {
    return this.http
      .get<SubscriptionDTO[]>(`/api/subscriptions/customer/${customerId}`)
      .toPromise();
  }
}

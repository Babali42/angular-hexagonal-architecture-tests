import { Injectable } from '@angular/core';
import { SubscriptionService } from '../../domain/services/subscription.service';

@Injectable({ providedIn: 'root' })
export class CancelSubscriptionUseCase {
  constructor(private subscriptionService: SubscriptionService) {}

  execute(subscriptionId: string) {
    return this.subscriptionService.cancelSubscription(subscriptionId);
  }
}

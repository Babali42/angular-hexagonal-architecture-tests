import { Injectable } from '@angular/core';
import { SubscriptionService } from '../../domain/services/subscription.service';

@Injectable({ providedIn: 'root' })
export class CreateSubscriptionUseCase {
  constructor(private subscriptionService: SubscriptionService) {}

  execute(customerId: string, planName: string, monthlyCost: number) {
    return this.subscriptionService.createSubscription(customerId, planName, monthlyCost);
  }
}

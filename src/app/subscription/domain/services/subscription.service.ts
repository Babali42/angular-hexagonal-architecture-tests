import {Inject, Injectable} from '@angular/core';
import { Subscription } from '../models/subscription.model';
import { SubscriptionRepository } from '../ports/subscription-repository.port';
import { BillingNotifier } from '../ports/billing-notifier.port';
import {BILLING_NOTIFIER, SUBSCRIPTION_REPOSITORY} from '../../infrastructure/subscription.module';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)  private subscriptionRepo: SubscriptionRepository,
    @Inject(BILLING_NOTIFIER) private billingNotifier: BillingNotifier
  ) {}

  async createSubscription(customerId: string, planName: string, monthlyCost: number) {
    const subscription = new Subscription(
      this.generateId(),
      customerId,
      { name: planName, monthlyCost }
    );
    await this.subscriptionRepo.save(subscription);
    return subscription;
  }

  async cancelSubscription(subscriptionId: string) {
    const subscription = await this.subscriptionRepo.findById(subscriptionId);
    if (!subscription) throw new Error('Subscription not found');
    subscription.cancel();
    await this.subscriptionRepo.save(subscription);
    this.billingNotifier.stopInvoicingForSubscription(subscriptionId);
  }

  private generateId(): string {
    return 'sub-' + Math.random().toString(36).substring(2, 15);
  }
}

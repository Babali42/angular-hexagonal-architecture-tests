import { Subscription } from '../models/subscription.model';
import { SubscriptionRepository } from '../ports/subscription-repository.port';
import { BillingNotifier } from '../ports/billing-notifier.port';

export class SubscriptionService {
  constructor(
    private subscriptionRepo: SubscriptionRepository,
    private billingNotifier: BillingNotifier
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

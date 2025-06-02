import { Subscription } from '../models/subscription.model';

export interface SubscriptionRepository {
  save(subscription: Subscription): Promise<void>;
  findById(subscriptionId: string): Promise<Subscription | null>;
  findByCustomerId(customerId: string): Promise<Subscription[]>;
}

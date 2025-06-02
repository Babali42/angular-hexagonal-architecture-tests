import { Injectable } from '@angular/core';
import { Subscription } from '../../domain/models/subscription.model';
import { SubscriptionRepository } from '../../domain/ports/subscription-repository.port';

@Injectable({ providedIn: 'root' })
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  private storage = new Map<string, Subscription>();

  async save(subscription: Subscription): Promise<void> {
    this.storage.set(subscription.id, subscription);
  }

  async findById(subscriptionId: string): Promise<Subscription | null> {
    return this.storage.get(subscriptionId) ?? null;
  }

  async findByCustomerId(customerId: string): Promise<Subscription[]> {
    return Array.from(this.storage.values()).filter(
      sub => sub.customerId === customerId && sub.isActive()
    );
  }
}

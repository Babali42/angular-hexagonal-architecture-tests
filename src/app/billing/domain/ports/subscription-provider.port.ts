import { SubscriptionDTO } from '../../../shared/types/subscription-dto';

export interface SubscriptionProvider {
  getActiveSubscriptionsForCustomer(customerId: string): Promise<SubscriptionDTO[] | undefined>;
}

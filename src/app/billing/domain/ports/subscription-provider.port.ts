import {SubscriptionData} from './subscription-data';


export interface SubscriptionProvider {
  getActiveSubscriptionsForCustomer(customerId: string): Promise<SubscriptionData[] | undefined>;
}

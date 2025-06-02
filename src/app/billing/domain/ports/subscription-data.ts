/**
 * Data required by Billing domain to calculate invoice.
 * Defined here so domain is self-contained.
 */
export interface SubscriptionData {
  id: string;
  planName: string;
  monthlyCost: number;
  active: boolean;
}

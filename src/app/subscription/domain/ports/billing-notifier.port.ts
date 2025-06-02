export interface BillingNotifier {
  stopInvoicingForSubscription(subscriptionId: string): void;
}

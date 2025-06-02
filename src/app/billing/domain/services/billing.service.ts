import {Inject, Injectable} from '@angular/core';
import { SubscriptionProvider } from '../ports/subscription-provider.port';
import { InvoiceRepository } from '../ports/invoice-repository.port';
import { Invoice, InvoiceItem } from '../models/invoice.model';
import {SUBSCRIPTION_REPOSITORY} from '../../../subscription/infrastructure/subscription.module';
import {INVOICE_REPOSITORY, SUBSCRIPTION_PROVIDER} from '../../infrastructure/billing.module';

@Injectable({ providedIn: 'root' })
export class BillingService {
  constructor(
    @Inject(SUBSCRIPTION_PROVIDER) private subscriptionProvider: SubscriptionProvider,
    @Inject(INVOICE_REPOSITORY) private invoiceRepository: InvoiceRepository
  ) {}

  async generateInvoice(customerId: string): Promise<Invoice> {
    const subs = await this.subscriptionProvider.getActiveSubscriptionsForCustomer(customerId);
    const items: InvoiceItem[] = subs!.map(sub =>
      new InvoiceItem(sub.planName, sub.monthlyCost)
    );
    const total = items.reduce((sum, i) => sum + i.amount, 0);
    const invoice = new Invoice(this.generateId(), customerId, items, total);
    await this.invoiceRepository.save(invoice);
    return invoice;
  }

  private generateId(): string {
    return 'inv-' + Math.random().toString(36).substring(2, 15);
  }
}

import { Injectable, Inject } from '@angular/core';
import { BillingService } from '../../domain/services/billing.service';

@Injectable({ providedIn: 'root' })
export class GenerateInvoiceUseCase {
  constructor(
    @Inject('BillingService') private billingService: BillingService
  ) {}

  execute(customerId: string) {
    return this.billingService.generateInvoice(customerId);
  }
}

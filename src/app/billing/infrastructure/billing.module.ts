import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionRestClient } from './adapters/subscription-rest-client.service';
import { InvoiceRepositoryImpl } from './adapters/invoice-repository.service';
import { SubscriptionProvider } from '../domain/ports/subscription-provider.port';
import { InvoiceRepository } from '../domain/ports/invoice-repository.port';

export const SUBSCRIPTION_PROVIDER = Symbol('SubscriptionProvider');
export const INVOICE_REPOSITORY = Symbol('InvoiceRepository');

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: SUBSCRIPTION_PROVIDER, useClass: SubscriptionRestClient },
    { provide: INVOICE_REPOSITORY, useClass: InvoiceRepositoryImpl }
  ]
})
export class BillingModule {}

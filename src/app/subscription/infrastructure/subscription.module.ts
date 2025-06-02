import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionRepositoryImpl } from './adapters/subscription-repository.service';
import { BillingRestClient } from './adapters/billing-rest-client.service';
import { SubscriptionRepository } from '../domain/ports/subscription-repository.port';
import { BillingNotifier} from '../domain/ports/billing-notifier.port';

export const SUBSCRIPTION_REPOSITORY = Symbol('SubscriptionRepository');
export const BILLING_NOTIFIER = Symbol('BillingNotifier');

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: SUBSCRIPTION_REPOSITORY, useClass: SubscriptionRepositoryImpl },
    { provide: BILLING_NOTIFIER, useClass: BillingRestClient }
  ]
})
export class SubscriptionModule {}

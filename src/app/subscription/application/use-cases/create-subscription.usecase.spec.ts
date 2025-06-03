import { CreateSubscriptionUseCase } from './create-subscription.usecase';
import { SubscriptionService } from '../../domain/services/subscription.service';
import { Subscription } from '../../domain/models/subscription.model';
import { Plan } from '../../domain/models/plan.model';

describe('CreateSubscriptionUseCase', () => {
  let useCase: CreateSubscriptionUseCase;
  let subscriptionServiceSpy: jasmine.SpyObj<SubscriptionService>;

  beforeEach(() => {
    subscriptionServiceSpy = jasmine.createSpyObj('SubscriptionService', ['createSubscription']);
    useCase = new CreateSubscriptionUseCase(subscriptionServiceSpy);
  });

  it('should create a subscription for a customer', async () => {
    const mockSub = new Subscription('sub-123', 'cust-001', new Plan('Pro', 20));
    subscriptionServiceSpy.createSubscription.and.returnValue(Promise.resolve(mockSub));

    const result = await useCase.execute('cust-001', 'Pro', 20);

    expect(subscriptionServiceSpy.createSubscription).toHaveBeenCalledWith('cust-001', 'Pro', 20);
    expect(result).toBe(mockSub);
  });
});

import { CancelSubscriptionUseCase } from './cancel-subscription.usecase';
import { SubscriptionService } from '../../domain/services/subscription.service';

describe('CancelSubscriptionUseCase', () => {
  let useCase: CancelSubscriptionUseCase;
  let subscriptionService: jasmine.SpyObj<SubscriptionService>;

  beforeEach(() => {
    subscriptionService = jasmine.createSpyObj<SubscriptionService>('SubscriptionService', ['cancelSubscription']);
    useCase = new CancelSubscriptionUseCase(subscriptionService);
  });

  it('should call cancelSubscription on the service with the correct ID', async () => {
    const subscriptionId = 'sub-123';
    subscriptionService.cancelSubscription.and.returnValue(Promise.resolve());

    await useCase.execute(subscriptionId);

    expect(subscriptionService.cancelSubscription).toHaveBeenCalledOnceWith(subscriptionId);
  });

  it('should propagate errors thrown by the service', async () => {
    const subscriptionId = 'sub-456';
    const error = new Error('Subscription not found');
    subscriptionService.cancelSubscription.and.returnValue(Promise.reject(error));

    await expectAsync(useCase.execute(subscriptionId)).toBeRejectedWith(error);
  });
});

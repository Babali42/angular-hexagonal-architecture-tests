import { Plan } from './plan.model';

export class Subscription {
  private canceled = false;

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public plan: Plan
  ) {}

  cancel() {
    this.canceled = true;
  }

  isActive(): boolean {
    return !this.canceled;
  }
}

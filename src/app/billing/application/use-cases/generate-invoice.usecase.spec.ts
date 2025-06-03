import { GenerateInvoiceUseCase } from './generate-invoice.usecase';
import { BillingService } from '../../domain/services/billing.service';
import { Invoice } from '../../domain/models/invoice.model';

describe('GenerateInvoiceUseCase', () => {
  let useCase: GenerateInvoiceUseCase;
  let billingServiceSpy: jasmine.SpyObj<BillingService>;

  beforeEach(() => {
    billingServiceSpy = jasmine.createSpyObj('BillingService', ['generateInvoice']);
    useCase = new GenerateInvoiceUseCase(billingServiceSpy);
  });

  it('should generate an invoice for a given customer', async () => {
    const mockInvoice = new Invoice('inv-123', 'cust-001', [], 100);
    billingServiceSpy.generateInvoice.and.returnValue(Promise.resolve(mockInvoice));

    const result = await useCase.execute('cust-001');

    expect(billingServiceSpy.generateInvoice).toHaveBeenCalledWith('cust-001');
    expect(result).toBe(mockInvoice);
  });
});

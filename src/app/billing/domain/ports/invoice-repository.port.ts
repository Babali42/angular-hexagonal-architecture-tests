import { Invoice } from '../models/invoice.model';

export interface InvoiceRepository {
  save(invoice: Invoice): Promise<void>;
  findById(invoiceId: string): Promise<Invoice | null>;
}

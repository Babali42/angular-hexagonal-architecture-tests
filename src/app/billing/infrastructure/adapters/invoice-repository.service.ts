import { Injectable } from '@angular/core';
import { Invoice } from '../../domain/models/invoice.model';
import { InvoiceRepository } from '../../domain/ports/invoice-repository.port';

@Injectable({ providedIn: 'root' })
export class InvoiceRepositoryImpl implements InvoiceRepository {
  private storage = new Map<string, Invoice>();

  async save(invoice: Invoice): Promise<void> {
    this.storage.set(invoice.id, invoice);
  }

  async findById(invoiceId: string): Promise<Invoice | null> {
    return this.storage.get(invoiceId) ?? null;
  }
}

export class Invoice {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: InvoiceItem[],
    public readonly totalAmount: number
  ) {}
}

export class InvoiceItem {
  constructor(
    public readonly description: string,
    public readonly amount: number
  ) {}
}

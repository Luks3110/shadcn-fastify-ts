import { inject, injectable } from 'tsyringe';
import { CustomerRepository } from '@infrastructure/repositories/Customer/customer.repository';
import { ReadCustomersPaginatedParams } from '@domain/validation/customer.schema';

@injectable()
export class ReadCustomersPaginated {
  constructor(
    @inject(CustomerRepository.name)
    private readonly customerRepository: CustomerRepository
  ) {}

  public readCustomersWithPagination = async (
    customer: ReadCustomersPaginatedParams
  ) => {
    return this.customerRepository.readWithPagination(customer);
  };
}

import { inject, injectable } from 'tsyringe';

import { CreateCustomerParams } from '@domain/validation/customer.schema';
import { CustomerRepository } from '@infrastructure/repositories/Customer/customer.repository';

@injectable()
export class CreateCustomer {
  constructor(
    @inject(CustomerRepository.name)
    private readonly customerRepository: CustomerRepository
  ) {}

  public createCustomer = async (customer: CreateCustomerParams) => {
    return this.customerRepository.create(customer);
  };
}

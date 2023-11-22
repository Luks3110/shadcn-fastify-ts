import { inject, injectable } from 'tsyringe';
import { EmployeeRepository } from '@infrastructure/repositories/Employee/employee.repository';
import { CreateEmployeeParams } from '@domain/validation/employee.schema';

@injectable()
export class CreateEmployee {
  constructor(
    @inject(EmployeeRepository.name)
    private readonly employeeRepository: EmployeeRepository
  ) {}

  public createEmployee = async (employee: CreateEmployeeParams) => {
    return this.employeeRepository.create(employee);
  };
}

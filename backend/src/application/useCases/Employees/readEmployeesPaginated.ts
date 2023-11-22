import { inject, injectable } from 'tsyringe';
import { EmployeeRepository } from '@infrastructure/repositories/Employee/employee.repository';
import { ReadEmployeesPaginatedParams } from '@domain/validation/employee.schema';

@injectable()
export class ReadEmployeesPaginated {
  constructor(
    @inject(EmployeeRepository.name)
    private readonly employeeRepository: EmployeeRepository
  ) {}

  public readEmployeesWithPagination = async (
    employee: ReadEmployeesPaginatedParams
  ) => {
    return this.employeeRepository.readWithPagination(employee);
  };
}

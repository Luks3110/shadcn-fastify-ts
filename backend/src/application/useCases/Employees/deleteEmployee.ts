import { inject, injectable } from 'tsyringe';
import { EmployeeRepository } from '@infrastructure/repositories/Employee/employee.repository';
import { DeleteEmployeeParams } from '@domain/validation/employee.schema';

@injectable()
export class DeleteEmployee {
  constructor(
    @inject(EmployeeRepository.name)
    private readonly employeeRepository: EmployeeRepository
  ) {}

  public deleteEmployee = async (employee: DeleteEmployeeParams) => {
    return this.employeeRepository.delete(employee.employeeId);
  };
}

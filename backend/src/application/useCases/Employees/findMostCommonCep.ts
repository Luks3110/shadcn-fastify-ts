import { inject, injectable } from 'tsyringe';
import { EmployeeRepository } from '@infrastructure/repositories/Employee/employee.repository';

@injectable()
export class FindMostCommonCep {
  constructor(
    @inject(EmployeeRepository.name)
    private readonly employeeRepository: EmployeeRepository
  ) {}

  public findMostCommonCep = async () => {
    return this.employeeRepository.getMostCommonCep();
  };
}

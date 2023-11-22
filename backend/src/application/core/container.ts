import { container } from 'tsyringe';

import { PrismaProvider } from '@application/providers/prismaProvider';
import {
  IUserRepository,
  UserRepository,
} from '@infrastructure/repositories/User';
import UserController from '@interface/controller/user.controller';
import ViaCepService from '@infrastructure/external/api_services/via-cep-api/viaCepService';
import {
  CreateUser,
  DeleteUser,
  ReadUser,
  UpdateUser,
} from '@application/useCases/User';
import { EmployeeRepository } from '@infrastructure/repositories/Employee/employee.repository';
import EmployeeController from '@interface/controller/employee.controller';
import {
  CreateEmployee,
  DeleteEmployee,
  FindMostCommonCep,
  ReadEmployeesPaginated,
} from '@application/useCases/Employees';
import { CustomerRepository } from '@infrastructure/repositories/Customer/customer.repository';
import CustomerController from '@interface/controller/customer.controller';
import {
  CreateCustomer,
  ReadCustomersPaginated,
} from '@application/useCases/Customers';

container.register<PrismaProvider>(PrismaProvider.name, PrismaProvider);
container.register<ViaCepService>(ViaCepService.name, ViaCepService);
container.register<UserController>(UserController.name, UserController);
container.register<IUserRepository>(UserRepository.name, UserRepository);
container.register<CreateUser>(CreateUser.name, CreateUser);
container.register<ReadUser>(ReadUser.name, ReadUser);
container.register<UpdateUser>(UpdateUser.name, UpdateUser);
container.register<DeleteUser>(DeleteUser.name, DeleteUser);
container.register<FindMostCommonCep>(
  FindMostCommonCep.name,
  FindMostCommonCep
);
container.register<EmployeeRepository>(
  EmployeeRepository.name,
  EmployeeRepository
);
container.register<EmployeeController>(
  EmployeeController.name,
  EmployeeController
);
container.register<CreateEmployee>(CreateEmployee.name, CreateEmployee);
container.register<DeleteEmployee>(DeleteEmployee.name, DeleteEmployee);
container.register<ReadEmployeesPaginated>(
  ReadEmployeesPaginated.name,
  ReadEmployeesPaginated
);
container.register<CustomerRepository>(
  CustomerRepository.name,
  CustomerRepository
);
container.register<CustomerController>(
  CustomerController.name,
  CustomerController
);
container.register<CreateCustomer>(CreateCustomer.name, CreateCustomer);
container.register<ReadCustomersPaginated>(
  ReadCustomersPaginated.name,
  ReadCustomersPaginated
);

export { container };

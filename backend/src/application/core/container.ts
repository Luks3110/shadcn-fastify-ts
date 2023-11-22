import { container } from 'tsyringe';

import { PrismaProvider } from '@application/providers/prismaProvider';
import {
  IUserRepository,
  UserRepository,
} from '@infrastructure/repositories/User';
import UserController from '@interface/controller/user.controller';
import UserRoute from '@interface/routes/user.route';
import ViaCepService from '@infrastructure/external/api_services/via-cep-api/viaCepService';
import {
  CreateUser,
  DeleteUser,
  ReadUser,
  UpdateUser,
} from '@application/useCases/User';
import { EmployeeRepository } from '@infrastructure/repositories/Employee/employee.repository';
import EmployeeRoute from '@interface/routes/employee.route';
import EmployeeController from '@interface/controller/employee.controller';
import {
  CreateEmployee,
  DeleteEmployee,
  FindMostCommonCep,
} from '@application/useCases/Employees';
import { ReadEmployeesPaginated } from '@application/useCases/Employees/readEmployeesPaginated';

container.register<PrismaProvider>(PrismaProvider.name, PrismaProvider);
container.register<ViaCepService>(ViaCepService.name, ViaCepService);
container.register<UserRoute>(UserRoute.name, UserRoute);
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
container.register<EmployeeRoute>(EmployeeRoute.name, EmployeeRoute);
container.register<CreateEmployee>(CreateEmployee.name, CreateEmployee);
container.register<DeleteEmployee>(DeleteEmployee.name, DeleteEmployee);
container.register<ReadEmployeesPaginated>(
  ReadEmployeesPaginated.name,
  ReadEmployeesPaginated
);

export { container };

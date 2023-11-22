import { $ref } from '@domain/validation/employee.schema';
import EmployeeController from '@interface/controller/employee.controller';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { inject, injectable } from 'tsyringe';

@injectable()
class EmployeeRoute {
  constructor(
    @inject(EmployeeController.name)
    private readonly employeeController: EmployeeController
  ) {}
  public prefix_route = '/employee';

  public routes = async (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    _done: any
  ) => {
    fastify.get(
      '/findMostCommonCep',
      {
        schema: {
          response: {
            200: $ref('mostCommonCepResponse'),
          },
        },
      },
      this.employeeController.findMostCommonCep
    );

    fastify.post(
      '/create',
      {
        schema: {
          response: {
            201: $ref('createEmployeeResponse'),
          },
        },
      },
      this.employeeController.create
    );

    fastify.delete(
      '/delete/:employeeId',
      {
        schema: {
          params: $ref('deleteEmployee'),
          response: {
            200: $ref('deleteEmployeeResponse'),
          },
        },
      },
      this.employeeController.delete
    );

    fastify.get(
      '/readByPage',
      {
        schema: {
          querystring: $ref('readEmployeesPaginated'),
          response: {},
        },
      },
      this.employeeController.readEmployeesPaginated
    );
  };
}

export default EmployeeRoute;

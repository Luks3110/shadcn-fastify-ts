import { FastifyInstance } from 'fastify';
import { container } from '@application/core/container';
import EmployeeController from '@interface/controller/employee.controller';
import { $ref } from '@domain/validation/employee.schema';

async function employeeRoutes(server: FastifyInstance) {
  const employeeController = container.resolve(EmployeeController);
  server.get(
    '/findMostCommonCep',
    {
      schema: {
        response: {
          200: $ref('mostCommonCepResponse'),
        },
      },
    },
    employeeController.findMostCommonCep
  );

  server.post(
    '/create',
    {
      schema: {
        body: $ref('createEmployee'),
        response: {
          201: $ref('createEmployeeResponse'),
        },
      },
    },
    employeeController.create
  );

  server.delete(
    '/delete/:employeeId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            employeeId: {
              type: 'number',
              description: 'employee id',
            },
          },
        },
        response: {
          200: $ref('deleteEmployeeResponse'),
        },
      },
    },
    employeeController.delete
  );

  server.get(
    '/readByPage',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            cursor: {
              type: 'number',
              description: 'the id of the employee to start the pagination',
            },
            take: {
              type: 'number',
              description: 'the amount of employees by page',
            },
            skip: {
              type: 'number',
              description: 'the amount of employees to skip before the cursor',
            },
          },
        },
        response: { 
          200: $ref('readEmployeesPaginatedResponse') 
        },
      },
    },
    employeeController.readEmployeesPaginated
  );
}

export default employeeRoutes;

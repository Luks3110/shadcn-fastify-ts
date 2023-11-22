import { FastifyInstance } from 'fastify';
import { container } from '@application/core/container';
import CustomerController from '@interface/controller/customer.controller';
import { $ref } from '@domain/validation/customer.schema';

async function customerRoutes(server: FastifyInstance) {
  const customerController = container.resolve(CustomerController);

  server.post(
    '/create',
    {
      schema: {
        body: $ref('createCustomer'),
        response: {
          201: $ref('createCustomerResponse'),
        },
      },
    },
    customerController.create
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
              description: 'the id of the customer to start the pagination',
            },
            take: {
              type: 'number',
              description: 'the amount of customers by page',
            },
            skip: {
              type: 'number',
              description: 'the amount of customers to skip before the cursor',
            },
          },
        },
        response: {
          200: $ref('readCustomersPaginatedResponse'),
        },
      },
    },
    customerController.readCustomersPaginated
  );
}

export default customerRoutes;

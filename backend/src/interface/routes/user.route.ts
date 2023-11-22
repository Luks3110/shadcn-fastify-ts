import { $ref } from '@domain/validation/user.schema';
import { FastifyInstance } from 'fastify';
import { container } from '@application/core/container';
import UserController from '@interface/controller/user.controller';

async function userRoutes(server: FastifyInstance) {
  const userController = container.resolve(UserController);

  server.post(
    '/create',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('userSchema'),
        },
      },
    },
    userController.create
  );

  server.get(
    '/read/:userId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            userId: {
              type: 'number',
              description: 'user id',
            },
          },
        },
        response: {
          200: $ref('userSchema'),
        },
      },
    },
    userController.read
  );
}

export default userRoutes;

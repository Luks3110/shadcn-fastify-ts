import { $ref } from '@domain/validation/user.schema';
import UserController from '@interface/controller/user.controller';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { inject, injectable } from 'tsyringe';

@injectable()
class UserRoute {
  constructor(
    @inject(UserController.name)
    private readonly userController: UserController
  ) {}
  public prefix_route = '/user';

  public routes = async (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    _done: any
  ) => {
    fastify.post(
      '/create',
      {
        schema: {
          body: $ref('createUserSchema'),
          response: {
            201: $ref('userSchema'),
          },
        },
      },
      this.userController.create
    );

    fastify.get(
      '/read/:userId',
      {
        schema: {
          params: $ref('readUserSchema'),
          response: {
            200: $ref('userSchema'),
          },
        },
      },
      this.userController.read
    );
  };
}

export default UserRoute;

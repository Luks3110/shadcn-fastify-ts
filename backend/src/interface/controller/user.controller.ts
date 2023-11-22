import {
  CreateUser,
  DeleteUser,
  ReadUser,
  UpdateUser,
} from '@application/useCases/User';
import {
  CreateUserParams,
  DeleteUserParams,
  ReadUserParams,
  UpdateUserParams,
} from '@domain/validation/user.schema';
import { formatZodErrors } from '@infrastructure/utils/errorHandling';
import { AxiosError } from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { ZodError } from 'zod';

@injectable()
class UserController {
  constructor(
    @inject(CreateUser.name)
    private readonly createUserUsecase: CreateUser,
    @inject(ReadUser.name)
    private readonly readUserUsecase: ReadUser,
    @inject(DeleteUser.name)
    private readonly deleteUserUsecase: DeleteUser,
    @inject(UpdateUser.name)
    private readonly updateUserUsecase: UpdateUser
  ) {}
  public create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as CreateUserParams;

      const createdUser = await this.createUserUsecase.createUser(body);

      return reply.code(200).send({ user: createdUser });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return reply
          .code(error?.response?.status ?? 500)
          .send({ message: error?.message });
      }
      return reply.code(500).send({ message: error?.message });
    }
  };

  public read = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const params = request.params as ReadUserParams;
      const user = await this.readUserUsecase.readUser(params);

      return reply.code(200).send(user);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return reply
          .code(error?.response?.status ?? 500)
          .send({ message: error?.message });
      }

      if (error instanceof ZodError) {
        return reply.code(422).send({ errors: formatZodErrors(error) });
      }
      return reply.code(error?.code ?? 500).send({ message: error?.message });
    }
  };

  public update = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as UpdateUserParams;
      const updatedUser = await this.updateUserUsecase.updateUser(body);

      return reply.code(200).send({ user: updatedUser });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return reply
          .code(error?.response?.status ?? 500)
          .send({ message: error?.message });
      }
      if (error instanceof ZodError) {
        return reply.code(422).send({ errors: formatZodErrors(error) });
      }
      return reply.code(500).send({ message: error?.message });
    }
  };

  public delete = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as DeleteUserParams;
      await this.deleteUserUsecase.deleteUser(body);

      return reply.code(200);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return reply
          .code(error?.response?.status ?? 500)
          .send({ message: error?.message });
      }
      if (error instanceof ZodError) {
        return reply.code(422).send({ errors: formatZodErrors(error) });
      }
      return reply.code(500).send({ message: error?.message });
    }
  };
}

export default UserController;

import { CreateCustomer } from '@application/useCases/Customers/createCustomer';
import { ReadCustomersPaginated } from '@application/useCases/Customers/readCustomersPaginated';
import {
  CreateCustomerParams,
  ReadCustomersPaginatedParams,
  readCustomersPaginatedResponse,
} from '@domain/validation/customer.schema';
import { formatZodErrors } from '@infrastructure/utils/errorHandling';
import { AxiosError } from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { ZodError } from 'zod';

@injectable()
class CustomerController {
  constructor(
    @inject(CreateCustomer.name)
    private readonly createCustomerUsecase: CreateCustomer,
    @inject(ReadCustomersPaginated.name)
    private readonly readCustomersPaginatedUsecase: ReadCustomersPaginated
  ) {}

  public create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as CreateCustomerParams;

      const createdCustomer = await this.createCustomerUsecase.createCustomer(
        body
      );

      return reply.code(201).send(createdCustomer);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return reply.code(422).send({ errors: formatZodErrors(error) });
      }
      return reply.code(error?.code ?? 500).send({ errors: error?.message });
    }
  };

  public readCustomersPaginated = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const params = request.query as ReadCustomersPaginatedParams;

      const result =
        await this.readCustomersPaginatedUsecase.readCustomersWithPagination(
          params
        );

      if (!result?.length) {
        return reply.code(404).send({ message: "didn't found any customer" });
      }

      return reply.code(200).send(result);
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

export default CustomerController;

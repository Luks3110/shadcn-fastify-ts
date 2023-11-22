import {
  DeleteEmployee,
  FindMostCommonCep,
} from '@application/useCases/Employees';
import { CreateEmployee } from '@application/useCases/Employees/createEmployee';
import { ReadEmployeesPaginated } from '@application/useCases/Employees/readEmployeesPaginated';
import {
  CreateEmployeeParams,
  DeleteEmployeeParams,
  ReadEmployeesPaginatedParams,
} from '@domain/validation/employee.schema';
import { formatZodErrors } from '@infrastructure/utils/errorHandling';
import { AxiosError } from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { ZodError } from 'zod';

@injectable()
class EmployeeController {
  constructor(
    @inject(FindMostCommonCep.name)
    private readonly findMostCommonCepUsecase: FindMostCommonCep,
    @inject(CreateEmployee.name)
    private readonly createEmployeeUsecase: CreateEmployee,
    @inject(DeleteEmployee.name)
    private readonly deleteEmployeeUsecase: DeleteEmployee,
    @inject(ReadEmployeesPaginated.name)
    private readonly readEmployeesPaginatedUsecase: ReadEmployeesPaginated
  ) {}
  public findMostCommonCep = async (_: FastifyRequest, reply: FastifyReply) => {
    try {
      const mostCommonCep =
        await this.findMostCommonCepUsecase.findMostCommonCep();

      return reply.code(200).send(mostCommonCep);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return reply
          .code(error?.response?.status ?? 500)
          .send({ message: error?.message });
      }
      return reply.code(500).send({ message: error?.message });
    }
  };

  public create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as CreateEmployeeParams;

      const createdEmployee = await this.createEmployeeUsecase.createEmployee(
        body
      );

      return reply.code(201).send(createdEmployee);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return reply.code(422).send({ errors: formatZodErrors(error) });
      }
      return reply.code(error?.code ?? 500).send({ errors: error?.message });
    }
  };

  public delete = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const params = request.params as DeleteEmployeeParams;

      const result = await this.deleteEmployeeUsecase.deleteEmployee(params);

      return reply.code(200).send({ success: result });
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

  public readEmployeesPaginated = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const params = request.query as ReadEmployeesPaginatedParams;

      const result =
        await this.readEmployeesPaginatedUsecase.readEmployeesWithPagination(
          params
        );

        if (!result?.length) {
          return reply.code(404).send({ message: "didn't found any employee" });
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

export default EmployeeController;

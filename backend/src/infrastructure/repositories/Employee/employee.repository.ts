import { inject, injectable } from 'tsyringe';

import { PrismaProvider } from '@application/providers/prismaProvider';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreateEmployeeParams,
  MostCommonCepResponse,
  ReadEmployeesPaginatedParams,
  createEmployee,
} from '@domain/validation/employee.schema';
import { UserRepository } from '../User';

@injectable()
export class EmployeeRepository {
  private readonly prismaClient: PrismaClient;
  constructor(
    @inject(PrismaProvider)
    private readonly prismaProvider: PrismaProvider,
    @inject(UserRepository.name)
    private readonly userRepository: UserRepository
  ) {
    this.prismaClient = this.prismaProvider.getPrisma();
  }

  public create = async (employee: CreateEmployeeParams) => {
    try {
      const parsedEmployee = await createEmployee.parseAsync(employee);

      const createdUser = await this.userRepository.create(parsedEmployee);

      const createdEmployee = await this.prismaClient.employee.create({
        data: {
          user: {
            connect: {
              id: createdUser.id,
            },
          },
        },
        include: {
          user: true,
        },
      });

      return createdEmployee;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (employeeId: number) => {
    const employeeToDelete = await this.prismaClient.employee.findFirst({
      where: {
        id: employeeId,
      },
    });

    if (!employeeToDelete) {
      throw new Error('Employee not found');
    }

    Promise.all([
      await this.prismaClient.employee.delete({
        where: {
          id: employeeToDelete.id,
        },
      }),

      await this.prismaClient.user.delete({
        where: {
          id: employeeToDelete.userId,
        },
      }),
    ]);

    return true;
  };

  public getMostCommonCep = async (): Promise<MostCommonCepResponse> => {
    try {
      const mostCommonCep = await this.prismaClient.user.groupBy({
        by: ['cep'],
        _count: {
          cep: true,
        },
        where: {
          employee: {
            isNot: null,
          },
        },
        orderBy: {
          _count: {
            cep: 'desc',
          },
        },
        take: 1,
      });

      if (!mostCommonCep[0]) {
        throw new Error("Couldn't find the most common CEP");
      }

      return { cep: mostCommonCep[0].cep, count: mostCommonCep[0]._count.cep };
    } catch (error: any) {
      console.log(
        '🚀 ~ file: employee.repository.ts:41 ~ UserRepository ~ getMostCommonCep ~ error:',
        error
      );
      throw error;
    }
  };

  async readWithPagination(params: ReadEmployeesPaginatedParams) {
    let hasNext = true;
    let pageNumber = 1;
    const pages = [];

    while (hasNext && pageNumber <= 10) {
      const page = await this.getPaginatedEmployees(params);

      if (!page?.nextCursor) {
        hasNext = false;
      }

      if (page) pages.push(page);
      pageNumber++;

      params.cursor = page?.nextCursor;
    }
    return pages;
  }

  private async getPaginatedEmployees(params: ReadEmployeesPaginatedParams) {
    const { take = 5, skip = 0, cursor } = params;

    const findManyArgs: Prisma.EmployeeFindManyArgs = {
      take,
      skip,
      orderBy: {
        id: 'asc',
      },
      include: {
        user: true,
      },
    };

    if (cursor) {
      findManyArgs.cursor = {
        id: cursor,
      };
    }
    const employees = await this.prismaClient.employee.findMany(findManyArgs);

    if (!employees?.length) return;

    const nextCursor = await this.prismaClient.employee.findFirst({
      select: {
        id: true,
      },
      where: {
        id: { gt: employees[employees.length - 1]?.id },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const prevCursor = await this.prismaClient.employee.findFirst({
      select: {
        id: true,
      },
      where: {
        id: {
          lt: employees[0]?.id,
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return {
      items: employees,
      nextCursor: nextCursor?.id,
      prevCursor: prevCursor?.id,
    };
  }
}

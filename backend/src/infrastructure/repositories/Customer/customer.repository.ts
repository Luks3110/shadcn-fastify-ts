import { inject, injectable } from 'tsyringe';

import { PrismaProvider } from '@application/providers/prismaProvider';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserRepository } from '../User';
import {
  CreateCustomerParams,
  ReadCustomersPaginatedParams,
  createCustomer,
} from '@domain/validation/customer.schema';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@injectable()
export class CustomerRepository {
  private readonly prismaClient: PrismaClient;
  constructor(
    @inject(PrismaProvider)
    private readonly prismaProvider: PrismaProvider,
    @inject(UserRepository.name)
    private readonly userRepository: UserRepository
  ) {
    this.prismaClient = this.prismaProvider.getPrisma();
  }

  public create = async (customer: CreateCustomerParams) => {
    try {
      const parsedCustomer = await createCustomer.parseAsync(customer);

      const createdUser = await this.userRepository.create(parsedCustomer);

      const createdCustomer = await this.prismaClient.customer.create({
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
      return createdCustomer;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const meta = error.meta?.target as Array<string>;
          throw new Error(
            `A user already exists with these fields: ${meta.join(',')}`
          );
        }
      }
      throw error;
    }
  };

  public delete = async (customerId: number) => {
    const customerToDelete = await this.prismaClient.customer.findFirst({
      where: {
        id: customerId,
      },
    });

    if (!customerToDelete) {
      throw new Error('Customer not found');
    }

    Promise.all([
      await this.prismaClient.customer.delete({
        where: {
          id: customerToDelete.id,
        },
      }),

      await this.prismaClient.user.delete({
        where: {
          id: customerToDelete.userId,
        },
      }),
    ]);

    return true;
  };

  async readWithPagination(params: ReadCustomersPaginatedParams) {
    let hasNext = true;
    let pageNumber = 1;
    const pages = [];

    while (hasNext && pageNumber <= 10) {
      const page = await this.getPaginatedCustomers(params);

      if (!page?.nextCursor) {
        hasNext = false;
      }

      if (page) pages.push(page);
      pageNumber++;

      params.cursor = page?.nextCursor;
    }
    return pages;
  }

  private async getPaginatedCustomers(params: ReadCustomersPaginatedParams) {
    const { take = 5, skip = 0, cursor } = params;

    const findManyArgs: Prisma.CustomerFindManyArgs = {
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
    const customers = await this.prismaClient.customer.findMany(findManyArgs);

    if (!customers?.length) return;

    const nextCursor = await this.prismaClient.customer.findFirst({
      select: {
        id: true,
      },
      where: {
        id: { gt: customers[customers.length - 1]?.id },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const prevCursor = await this.prismaClient.customer.findFirst({
      select: {
        id: true,
      },
      where: {
        id: {
          lt: customers[0]?.id,
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return {
      items: customers,
      nextCursor: nextCursor?.id,
      prevCursor: prevCursor?.id,
    };
  }
}

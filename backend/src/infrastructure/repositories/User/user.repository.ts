import { inject, injectable } from 'tsyringe';

import { IUserRepository } from './userRepository.interface';
import { PrismaProvider } from '@application/providers/prismaProvider';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserParams } from '@domain/validation/user.schema';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import moment from 'moment';

@injectable()
export class UserRepository implements IUserRepository {
  private readonly prismaClient: PrismaClient;
  constructor(
    @inject(PrismaProvider)
    private readonly prismaProvider: PrismaProvider
  ) {
    this.prismaClient = this.prismaProvider.getPrisma();
  }

  async create(user: CreateUserParams) {
    try {
      const result = await this.prismaClient.user.create({
        data: user,
      });

      return result;
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const meta = error.meta?.target as Array<string>;
          throw new Error(
            `A user already exists with these fields: ${meta.join(',')}`
          );
        }
      }

      throw new Error(`There was an error creating the user`);
    }
  }

  async read(userId: number) {
    try {
      return this.prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new Error(`There was an error getting the user`);
    }
  }

  async update(userId: number, propertiesToUpdate: Partial<User>) {
    try {
      return this.prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          ...propertiesToUpdate,
          updatedAt: moment.utc().toDate(),
        },
      });
    } catch (error: any) {
      console.error(`There was an error updating a user: ${error?.message}`);
      throw error(`There was an error updating a user: ${error?.message}`);
    }
  }

  async delete(userId: number) {
    try {
      return this.prismaClient.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error: any) {
      console.error(`User Repository error: ${error?.message}`);
      throw new Error(`There was an error deleting a user: ${error?.message}`);
    }
  }
}

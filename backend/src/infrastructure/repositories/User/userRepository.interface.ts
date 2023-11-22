import { CreateUserParams } from '@domain/validation/user.schema';
import { User } from '@prisma/client';

export interface IUserRepository {
  create(user: CreateUserParams): Promise<unknown>;
  update(userId: number, propertiesToUpdate: Partial<User>): Promise<unknown>;
  delete(userId: number): Promise<unknown>;
}

import { inject, injectable } from 'tsyringe';

import {
  UpdateUserParams,
  updateUserSchema,
} from '@domain/validation/user.schema';
import { UserRepository } from '@infrastructure/repositories/User';

@injectable()
export class UpdateUser {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public updateUser = async (user: UpdateUserParams) => {
    try {
      const parsedUser = await updateUserSchema.parseAsync(user);

      const result = await this.userRepository.update(
        parsedUser.userId,
        parsedUser
      );

      return result;
    } catch (error: any) {
      console.error(error?.message);
      throw error;
    }
  };
}

import { inject, injectable } from 'tsyringe';

import {
  DeleteUserParams,
  deleteUserSchema,
} from '@domain/validation/user.schema';
import { UserRepository } from '@infrastructure/repositories/User';

@injectable()
export class DeleteUser {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public deleteUser = async (user: DeleteUserParams) => {
    try {
      const parsedUser = await deleteUserSchema.parseAsync(user);

      const result = await this.userRepository.delete(parsedUser.userId);

      return result;
    } catch (error: any) {
      console.log(
        '🚀 ~ file: deleteUser.ts:24 ~ DeleteUser ~ publicdeleteUser ~ error:',
        error
      );
      console.error(error?.message);
      throw error;
    }
  };
}

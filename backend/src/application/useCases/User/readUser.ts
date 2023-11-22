import { inject, injectable } from 'tsyringe';

import { UserRepository } from '@infrastructure/repositories/User';
import { ReadUserParams, readUserSchema } from '@domain/validation/user.schema';

@injectable()
export class ReadUser {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public readUser = async (user: ReadUserParams) => {
    try {
      const parsedUser = await readUserSchema.parseAsync(user);

      const result = await this.userRepository.read(parsedUser.userId);
      console.log(
        '🚀 ~ file: readUser.ts:22 ~ ReadUser ~ readUser= ~ result:',
        result
      );

      if (!result) {
        const error = new Error('User not found') as any;
        error.code = 404;
        throw error;
      }

      return result;
    } catch (error: any) {
      console.log(
        '🚀 ~ file: readUser.ts:21 ~ ReadUser ~ createUser= ~ error:',
        error
      );
      console.error(error?.message);
      throw error;
    }
  };
}

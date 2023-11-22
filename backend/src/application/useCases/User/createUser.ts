import { inject, injectable } from 'tsyringe';

import {
  CreateUserParams,
  createUserSchema,
} from '@domain/validation/user.schema';
import { UserRepository } from '@infrastructure/repositories/User';
import ViaCepService from '@infrastructure/external/api_services/via-cep-api/viaCepService';

@injectable()
export class CreateUser {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
    @inject(ViaCepService)
    private readonly viaCepService: ViaCepService
  ) {}

  public createUser = async (user: CreateUserParams) => {
    try {
      await this.viaCepService.searchByCep(user.cep);

      const parsedUser = await createUserSchema
        .parseAsync(user)
        .then((val) => val);

      const result = await this.userRepository.create(
        parsedUser as CreateUserParams
      );

      return result;
    } catch (error: any) {
      console.error(error?.message);
      throw error;
    }
  };
}

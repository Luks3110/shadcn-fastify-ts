import HttpClient from '@infrastructure/http/client';
import { AxiosError } from 'axios';
import { injectable } from 'tsyringe';

@injectable()
class ViaCepService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({ baseURL: 'https://viacep.com.br/ws/' });
  }

  async searchByCep(cep: string) {
    return this.httpClient.get(`${cep}/json`).catch((error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 400) {
          error.message = `CEP not found`;
        }
      }
      throw error;
    });
  }
}

export default ViaCepService;

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(options?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(options);
  }

  public async get<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url);
      return response.data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new Error(
        `There was and error fetching the data: ${error?.message}`
      );
    }
  }
}

export default HttpClient;

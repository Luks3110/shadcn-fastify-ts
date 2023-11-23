import { CreateUserParams } from '@/components/customers/customerForm';
import api from '../api';
import { AxiosError } from 'axios';

export async function createCustomer(params?: CreateUserParams) {
  try {
    const { data } = await api.post('/customers/create', params);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data);
    }
  }
}

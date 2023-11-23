import { CreateUserParams } from '@/components/employees/employeeForm';
import api from '../api';
import { AxiosError } from 'axios';

export async function createEmployee(params?: CreateUserParams) {
  try {
    const { data } = await api.post('/employees/create', params);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data);
    }
  }
}

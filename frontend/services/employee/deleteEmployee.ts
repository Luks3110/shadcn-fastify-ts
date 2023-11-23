import api from '../api';
import { AxiosError } from 'axios';
import { DeleteEmployeeParams } from '@/components/employees/employeeDeleteForm';

export async function deleteEmployee(params?: DeleteEmployeeParams) {
  try {
    const { data } = await api.delete(
      `/employees/delete/${params?.employeeId}`
    );

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error?.response?.data.message == 'Employee not found') {
        throw new Error('Não encontrado');
      }
      throw new Error(error?.response?.data?.message);
    }
  }
}

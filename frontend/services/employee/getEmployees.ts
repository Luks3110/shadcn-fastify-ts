import { EmployeePaginated } from '@/components/employees/columns';
import { PaginationParams } from '@/interface/types';
import api from '../api';

async function getEmployees(params?: PaginationParams) {
  const { take = '10', skip = '0', cursor = '1' } = params ?? {};

  const urlParams = new URLSearchParams({ take, skip, cursor });
  const { data } = await api.get<EmployeePaginated[]>(
    `/employees/readByPage?${urlParams.toString()}`
  );
  return data;
}

export default getEmployees;

import { CustomerPaginated } from '@/components/customers/columns';
import api from '../api';
import { PaginationParams } from '@/interface/types';

export async function getCustomers(params?: PaginationParams) {
  const { take = '10', skip = '0', cursor = '1' } = params ?? {};

  const urlParams = new URLSearchParams({ take, skip, cursor });
  const { data } = await api.get<CustomerPaginated[]>(
    `/customers/readByPage?${urlParams.toString()}`
  );
  return data;
}

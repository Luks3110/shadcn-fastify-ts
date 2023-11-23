import { Customer, CustomerPaginated } from '@/components/customers/columns';
import Customers from '@/components/customers/customers';
import { PaginationParams } from '@/interface/types';
import axios from 'axios';

async function getCustomers(params?: PaginationParams) {
  const { take = '10', skip = '0', cursor = '1' } = params ?? {};
  const baseURL = `http://localhost:8000/api`;

  const urlParams = new URLSearchParams({ take, skip, cursor });
  const { data } = await axios.get<CustomerPaginated[]>(
    `${baseURL}/customers/readByPage?${urlParams.toString}`
  );
  return data;
}

export default async function CustomersPage() {
  const data = await getCustomers();
  return <Customers customers={data} />;
}

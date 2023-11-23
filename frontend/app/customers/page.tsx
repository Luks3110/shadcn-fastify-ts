import Customers from '@/components/customers/customers';
import { getCustomers } from '@/services/customer/getCustomers';

export default async function CustomersPage() {
  const data = await getCustomers();
  return <Customers customers={data} />;
}

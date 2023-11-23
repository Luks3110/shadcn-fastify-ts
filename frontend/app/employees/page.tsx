import { EmployeePaginated } from '@/components/employees/columns';
import Employees from '@/components/employees/employees';
import getEmployees from '@/services/employee/getEmployees';

export default async function UsersPage() {
  const data = await getEmployees();
  return <Employees employees={data as EmployeePaginated[]} />;
}

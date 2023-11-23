import { EmployeePaginated, columns } from './columns';

import { DataTable } from '../ui/data-table';

export const EmployeeList = ({
  employees,
}: {
  employees: EmployeePaginated[];
}) => {
  const flatEmployees = employees.flatMap((el) => {
    return el.items;
  });

  return (
    <>
      <DataTable columns={columns} data={flatEmployees} />
    </>
  );
};

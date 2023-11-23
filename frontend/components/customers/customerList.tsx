import { CustomerPaginated, columns } from './columns';

import { DataTable } from '../ui/data-table';

export const CustomerList = ({
  customers,
}: {
  customers: CustomerPaginated[];
}) => {
  const flatCustomers = customers.flatMap((el) => {
    return el.items;
  });

  return (
    <>
      <DataTable columns={columns} data={flatCustomers} />
    </>
  );
};

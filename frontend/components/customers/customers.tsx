'use client';
import { CustomerPaginated } from './columns';
import { SkeletonRows } from '../ui/skeletonRows';
import { CustomerList } from './customerList';

export default function Customers({
  customers,
}: {
  customers: CustomerPaginated[];
}) {
  return (
    <div className="container mx-auto py-10">
      {customers ? (
        <CustomerList customers={customers} />
      ) : (
        <SkeletonRows quantity={20} />
      )}
    </div>
  );
}

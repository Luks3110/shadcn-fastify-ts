'use client';
import { EmployeePaginated } from './columns';
import { SkeletonRows } from '../ui/skeletonRows';
import { EmployeeList } from './employeeList';

export default function Employees({
  employees,
}: {
  employees: EmployeePaginated[];
}) {
  return (
    <div className="container mx-auto py-10">
      {employees ? (
        <EmployeeList employees={employees} />
      ) : (
        <SkeletonRows quantity={20} />
      )}
    </div>
  );
}

'use client';
import { EmployeePaginated } from './columns';
import { SkeletonRows } from '../ui/skeletonRows';
import { EmployeeList } from './employeeList';

export default function Employees({
  employees,
}: {
  employees: EmployeePaginated[];
}) {
  console.log('🚀 ~ file: employees.tsx:11 ~ employees:', employees);
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

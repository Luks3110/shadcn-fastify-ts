'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';

export type Employee = {
  id: number;
  userId: number;
  user: {
    name: string;
    email: string;
    birth: string;
    cep: string;
    address: string;
    document: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type EmployeePaginated = {
  items: Employee[];
  prevCursor: number;
  nextCursor: number;
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'user.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'user.document',
    header: 'Documento',
  },
  {
    accessorKey: 'user.address',
    header: 'Endereço',
  },
  {
    accessorKey: 'user.cep',
    header: 'CEP',
  },
];

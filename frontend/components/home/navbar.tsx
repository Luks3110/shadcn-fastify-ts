'use client';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../ui/menubar';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <header className="flex flex-col items-center w-100">
      <Menubar className="sm:gap-3 md:gap-[5rem]">
        <MenubarMenu>
          <MenubarTrigger>Funcionários</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href={`/employees`}>Listar</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href={`/employees/create`}>Criar</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href={`/employees/delete`}>Demitir</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href={`/employees/mostCommonCep`}>CEP mais comum</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Clientes</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href={`/customers`}>Listar</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href={`/customers/create`}>Criar</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  );
};

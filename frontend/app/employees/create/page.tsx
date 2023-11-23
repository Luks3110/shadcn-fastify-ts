import { CreateEmployeeForm } from '@/components/employees/employeeForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CreateEmployeePage() {
  return (
    <main className="flex items-center flex-col p-5">
      <Card className="sm:w-[40vw] md:w-[40vw] lg:w-[35vw] h-fit flex flex-col items-center justify-center">
        <CardHeader className="text-center">
          <CardTitle>Crie um funcionário</CardTitle>
          <CardDescription>
            Formulário para criação de funcionário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateEmployeeForm />
        </CardContent>
      </Card>
    </main>
  );
}

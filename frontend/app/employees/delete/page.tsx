import { DeleteEmployeeForm } from '@/components/employees/employeeDeleteForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DeleteEmployeePage() {
  return (
    <main className="flex items-center flex-col p-5">
      <Card className="sm:w-[40vw] md:w-[40vw] lg:w-[35vw] h-fit flex flex-col items-center justify-center">
        <CardHeader className="text-center">
          <CardTitle>Demita um funcionário</CardTitle>
          <CardDescription>
            Formulário para demitir um funcionário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteEmployeeForm />
        </CardContent>
      </Card>
    </main>
  );
}

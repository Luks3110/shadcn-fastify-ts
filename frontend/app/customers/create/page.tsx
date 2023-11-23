import { CreateCustomerForm } from '@/components/customers/customerForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CreateCustomerPage() {
  return (
    <main className="flex items-center flex-col p-5">
      <Card className="sm:w-[40vw] md:w-[40vw] lg:w-[35vw] h-fit flex flex-col items-center justify-center">
        <CardHeader className="text-center">
          <CardTitle>Crie um cliente</CardTitle>
          <CardDescription>Formulário para criação de cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCustomerForm />
        </CardContent>
      </Card>
    </main>
  );
}

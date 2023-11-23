'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteEmployee } from '@/services/employee/deleteEmployee';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '../ui/toast';

const deleteEmployeeSchema = z.object({
  employeeId: z.string({ required_error: 'Obrigatório' }),
});

export type DeleteEmployeeParams = z.infer<typeof deleteEmployeeSchema>;

export function DeleteEmployeeForm() {
  const [customError, setCustomError] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<DeleteEmployeeParams>({
    resolver: zodResolver(deleteEmployeeSchema),
    mode: 'onChange',
  });

  async function onSubmit(values: DeleteEmployeeParams) {
    try {
      await deleteEmployee(values);
      toast({
        title: 'O funcionário foi demitido com sucesso.',
        variant: 'default',
      });
      router.replace('/employees');
    } catch (error: any) {
      if (error.message == 'Não encontrado') {
        toast({
          variant: 'destructive',
          title: 'Opa! Algo deu errado.',
          description:
            'O funcionário não foi encontrado, tente novamente com outro ID',
          action: (
            <ToastAction altText="Tentar novamente">
              Tentar novamente
            </ToastAction>
          ),
        });
        return;
      }
      toast({
        variant: 'destructive',
        title: 'Opa! Algo deu errado.',
        description: 'Não foi possível demitir o funcionário.',
        action: (
          <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>
        ),
      });
    }
  }

  useEffect(() => {
    if (!customError?.length) return;

    const timeout = setTimeout(() => {
      setCustomError('');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [customError]);

  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full"
              type="submit"
            >
              Demitir
            </Button>
          </form>
        </Form>
        <div>
          {customError?.length ? (
            <p className="text-red-700 text-sm text-center">{customError}</p>
          ) : null}
        </div>
      </div>
    </>
  );
}

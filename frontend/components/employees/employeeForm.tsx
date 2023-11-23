'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

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
import moment from 'moment';
import { createEmployee } from '@/services/employee/createEmployee';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

const createEmployeeSchema = z.object({
  name: z.string({ required_error: 'Obrigatório' }),
  email: z.string().email().optional(),
  birth: z.string({ required_error: 'Obrigatório' }).transform((val) => {
    return moment(val).utc().toString();
  }),
  cep: z.string({ required_error: 'Obrigatório' }),
  address: z.string({ required_error: 'Obrigatório' }),
  document: z.string({ required_error: 'Obrigatório' }),
});

export type CreateUserParams = z.infer<typeof createEmployeeSchema>;

export function CreateEmployeeForm() {
  const [customError, setCustomError] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CreateUserParams>({
    resolver: zodResolver(createEmployeeSchema),
    mode: 'onChange',
  });

  async function onSubmit(values: CreateUserParams) {
    try {
      await createEmployee(values);
      toast({
        title: 'O funcionário foi criado com sucesso.',
        variant: 'default',
      });
      router.replace('/employees');
      setCustomError('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Opa! Algo deu errado.',
        description: 'Não foi possível criar o funcionário.',
        action: (
          <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>
        ),
      });
      setCustomError('Houve um erro ao criar o usuário, tente novamente');
    }
  }

  useEffect(() => {
    if (!customError?.length) return;

    const timeout = setTimeout(() => {
      setCustomError('');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [customError]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="João da Silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          control={form.control}
          name="birth"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <Input
                  onChange={(e) =>
                    onChange(
                      e.target.value.replace(
                        /^(\d{2})(\d{2})(\d{4})$/,
                        '$1/$2/$3'
                      )
                    )
                  }
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="00000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Rua das acácias 32" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documento</FormLabel>
              <FormControl>
                <Input placeholder="123456789" {...field} />
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
          Criar
        </Button>
        {customError?.length ? (
          <p className="text-red-700 text-lg">{customError}</p>
        ) : null}
      </form>
    </Form>
  );
}

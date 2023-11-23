'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

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
import { createCustomer } from '@/services/customer/createCustomer';

import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

const createCustomerSchema = z.object({
  name: z.string({ required_error: 'Obrigatório' }),
  email: z.string().email().optional(),
  birth: z.string({ required_error: 'Obrigatório' }).transform((val) => {
    return moment(val).utc().toString();
  }),
  cep: z.string({ required_error: 'Obrigatório' }),
  address: z.string({ required_error: 'Obrigatório' }),
  document: z.string({ required_error: 'Obrigatório' }),
});

export type CreateUserParams = z.infer<typeof createCustomerSchema>;

export function CreateCustomerForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CreateUserParams>({
    resolver: zodResolver(createCustomerSchema),
    mode: 'onChange',
  });

  async function onSubmit(values: CreateUserParams) {
    try {
      await createCustomer(values);
      toast({
        title: 'O cliente foi criado com sucesso.',
        variant: 'default',
      });
      router.replace('/customers');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Opa! Algo deu errado.',
        description: 'Não foi possível criar o cliente.',
        action: (
          <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>
        ),
      });
    }
  }

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
      </form>
    </Form>
  );
}

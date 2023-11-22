import { z } from 'zod';
import { userSchema, createUserSchema } from './user.schema';
import { buildJsonSchemas } from 'fastify-zod';

export const employeeSchema = {
  id: z.number(),
  userId: z.number(),
};
export const mostCommonCepResponse = z.object({
  cep: z.string(),
  count: z.number(),
});

export const createEmployee = createUserSchema;

export const createEmployeeResponse = z.object({
  ...employeeSchema,
  user: userSchema,
});

export const deleteEmployee = z.object({
  employeeId: z.number(),
});

export const deleteEmployeeResponse = z.object({
  success: z.boolean(),
});

export const readEmployeesPaginated = z.object({
  take: z.number().optional(),
  skip: z.number().optional(),
  cursor: z.number().optional(),
});

export type CreateEmployeeParams = z.infer<typeof createEmployee>;
export type CreateEmployeeResponse = z.infer<typeof createEmployeeResponse>;

export type DeleteEmployeeParams = z.infer<typeof deleteEmployee>;

export type MostCommonCepResponse = z.infer<typeof mostCommonCepResponse>;

export type ReadEmployeesPaginatedParams = z.infer<
  typeof readEmployeesPaginated
>;

export const { schemas: employeeSchemas, $ref } = buildJsonSchemas(
  {
    createEmployee,
    createEmployeeResponse,
    deleteEmployee,
    deleteEmployeeResponse,
    readEmployeesPaginated,
    mostCommonCepResponse,
  },
  { $id: 'EmployeeSchemas' }
);

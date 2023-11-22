import { z } from 'zod';
import { userSchema, createUserSchema } from './user.schema';
import { buildJsonSchemas } from 'fastify-zod';

export const customerSchema = {
  id: z.number(),
  userId: z.number(),
};

export const createCustomer = createUserSchema;

export const createCustomerResponse = z.object({
  ...customerSchema,
  user: userSchema,
});

export const deleteCustomer = z.object({
  customerId: z.number(),
});

export const deleteCustomerResponse = z.object({
  success: z.boolean(),
});

export const readCustomersPaginated = z.object({
  take: z.number().optional(),
  skip: z.number().optional(),
  cursor: z.number().optional(),
});

export const readCustomersPaginatedResponse = z.array(
  z
    .object({
      items: z.array(
        z.object({
          ...customerSchema,
          user: userSchema,
        })
      ),
      prevCursor: z.number().optional(),
      nextCursor: z.number().optional(),
    })
    .optional()
);

export type CreateCustomerParams = z.infer<typeof createCustomer>;
export type CreateCustomerResponse = z.infer<typeof createCustomerResponse>;

export type ReadCustomersPaginatedParams = z.infer<
  typeof readCustomersPaginated
>;

export const { schemas: customerSchemas, $ref } = buildJsonSchemas(
  {
    createCustomer,
    createCustomerResponse,
    deleteCustomer,
    deleteCustomerResponse,
    readCustomersPaginated,
    customerSchema: z.object(customerSchema),
    readCustomersPaginatedResponse,
  },
  { $id: 'CustomerSchemas' }
);

export const customerJsonSchemas = {
  createCustomer,
  createCustomerResponse,
  deleteCustomer,
  deleteCustomerResponse,
  readCustomersPaginated,
  customerSchema: z.object(customerSchema),
  readCustomersPaginatedResponse,
};

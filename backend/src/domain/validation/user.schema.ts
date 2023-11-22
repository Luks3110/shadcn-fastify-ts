import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';
import moment from 'moment';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  birth: z.date(),
  cep: z.string(),
  address: z.string(),
  document: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  birth: z.string().transform((val) => {
    return moment.utc(val, 'DD/MM/YYYY').toDate();
  }),
  cep: z.string(),
  address: z.string(),
  document: z.string(),
});

export const updateUserSchema = z.object({
  userId: z.number(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  birth: z.date().optional(),
  cep: z.string().optional(),
  address: z.string().optional(),
  document: z.string().optional(),
});

export const deleteUserSchema = z.object({
  userId: z.number(),
});

export const deleteUserResponse = z.object({
  success: z.boolean(),
});

export const readUserSchema = deleteUserSchema;

export type CreateUserParams = z.infer<typeof createUserSchema>;
export type ReadUserParams = z.infer<typeof readUserSchema>;
export type DeleteUserParams = z.infer<typeof deleteUserSchema>;
export type UpdateUserParams = z.infer<typeof updateUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    userSchema,
    createUserSchema,
    readUserSchema,
    updateUserSchema,
    deleteUserSchema,
    deleteUserResponse,
  },
  { $id: 'UserSchemas' }
);

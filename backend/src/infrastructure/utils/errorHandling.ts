import { ZodError } from 'zod';

export const formatZodErrors = (error: ZodError) => {
  const formattedErrors = error.errors.map((err: any) => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return formattedErrors;
};

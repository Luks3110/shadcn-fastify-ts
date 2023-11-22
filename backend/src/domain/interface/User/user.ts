import { userSchema } from '@domain/validation/user.schema';
import { z } from 'zod';

export type User = z.infer<typeof userSchema>;

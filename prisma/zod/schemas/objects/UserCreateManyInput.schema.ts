import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreatedepartementsInputObjectSchema } from './UserCreatedepartementsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateManyInput> = z
  .object({
    id: z.number().optional(),
    name: z.string().optional().nullable(),
    nom: z.string().optional().nullable(),
    prenom: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    emailVerified: z.coerce.date().optional().nullable(),
    image: z.string().optional().nullable(),
    role: z
      .lazy(() => RoleSchema)
      .optional()
      .nullable(),
    departement: z.string().optional().nullable(),
    departements: z
      .union([
        z.lazy(() => UserCreatedepartementsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
  })
  .strict();

export const UserCreateManyInputObjectSchema = Schema;

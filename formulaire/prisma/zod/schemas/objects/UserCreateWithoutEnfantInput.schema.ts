import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreatedepartementsInputObjectSchema } from './UserCreatedepartementsInput.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema';
import { DossierCreateNestedManyWithoutUserInputObjectSchema } from './DossierCreateNestedManyWithoutUserInput.schema';
import { CommentsCreateNestedManyWithoutUserInputObjectSchema } from './CommentsCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateWithoutEnfantInput> = z
  .object({
    name: z.string().optional().nullable(),
    nom: z.string().optional().nullable(),
    prenom: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    telephone: z.string().optional().nullable(),
    fonction: z.string().optional().nullable(),
    emailVerified: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
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
    Account: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    Session: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    dossiers: z
      .lazy(() => DossierCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    comments: z
      .lazy(() => CommentsCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserCreateWithoutEnfantInputObjectSchema = Schema;

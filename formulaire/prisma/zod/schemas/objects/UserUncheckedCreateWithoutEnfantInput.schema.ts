import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreatedepartementsInputObjectSchema } from './UserCreatedepartementsInput.schema';
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema';
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { DossierUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './DossierUncheckedCreateNestedManyWithoutUserInput.schema';
import { CommentsUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './CommentsUncheckedCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutEnfantInput> = z
  .object({
    id: z.number().optional(),
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
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    Session: z
      .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    dossiers: z
      .lazy(() => DossierUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    comments: z
      .lazy(() => CommentsUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutEnfantInputObjectSchema = Schema;

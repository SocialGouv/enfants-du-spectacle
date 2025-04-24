import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreatedepartementsInputObjectSchema } from './UserCreatedepartementsInput.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema';
import { DossierCreateNestedManyWithoutUserInputObjectSchema } from './DossierCreateNestedManyWithoutUserInput.schema';
import { DossierCreateNestedManyWithoutMedecinInputObjectSchema } from './DossierCreateNestedManyWithoutMedecinInput.schema';
import { CommentaireCreateNestedManyWithoutUserInputObjectSchema } from './CommentaireCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateWithoutSendListInput> = z
  .object({
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
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    dossiers: z
      .lazy(() => DossierCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    dossiersMedecin: z
      .lazy(() => DossierCreateNestedManyWithoutMedecinInputObjectSchema)
      .optional(),
    commentaires: z
      .lazy(() => CommentaireCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserCreateWithoutSendListInputObjectSchema = Schema;

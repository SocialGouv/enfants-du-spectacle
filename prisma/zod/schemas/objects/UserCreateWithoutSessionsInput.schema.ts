import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreatedepartementsInputObjectSchema } from './UserCreatedepartementsInput.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { DossierCreateNestedManyWithoutUserInputObjectSchema } from './DossierCreateNestedManyWithoutUserInput.schema';
import { DossierCreateNestedManyWithoutMedecinInputObjectSchema } from './DossierCreateNestedManyWithoutMedecinInput.schema';
import { CommentaireCreateNestedManyWithoutUserInputObjectSchema } from './CommentaireCreateNestedManyWithoutUserInput.schema';
import { SendListCreateNestedManyWithoutUserInputObjectSchema } from './SendListCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z
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
    dossiers: z
      .lazy(() => DossierCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    dossiersMedecin: z
      .lazy(() => DossierCreateNestedManyWithoutMedecinInputObjectSchema)
      .optional(),
    commentaires: z
      .lazy(() => CommentaireCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    SendList: z
      .lazy(() => SendListCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserCreateWithoutSessionsInputObjectSchema = Schema;

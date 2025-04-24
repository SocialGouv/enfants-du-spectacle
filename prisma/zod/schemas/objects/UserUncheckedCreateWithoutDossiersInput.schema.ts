import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreatedepartementsInputObjectSchema } from './UserCreatedepartementsInput.schema';
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema';
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { DossierUncheckedCreateNestedManyWithoutMedecinInputObjectSchema } from './DossierUncheckedCreateNestedManyWithoutMedecinInput.schema';
import { CommentaireUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './CommentaireUncheckedCreateNestedManyWithoutUserInput.schema';
import { SendListUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SendListUncheckedCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutDossiersInput> = z
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
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    sessions: z
      .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    dossiersMedecin: z
      .lazy(
        () => DossierUncheckedCreateNestedManyWithoutMedecinInputObjectSchema,
      )
      .optional(),
    commentaires: z
      .lazy(
        () => CommentaireUncheckedCreateNestedManyWithoutUserInputObjectSchema,
      )
      .optional(),
    SendList: z
      .lazy(() => SendListUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutDossiersInputObjectSchema = Schema;

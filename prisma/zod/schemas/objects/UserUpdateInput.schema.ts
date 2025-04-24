import { z } from 'zod';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { NullableEnumRoleFieldUpdateOperationsInputObjectSchema } from './NullableEnumRoleFieldUpdateOperationsInput.schema';
import { UserUpdatedepartementsInputObjectSchema } from './UserUpdatedepartementsInput.schema';
import { AccountUpdateManyWithoutUserNestedInputObjectSchema } from './AccountUpdateManyWithoutUserNestedInput.schema';
import { SessionUpdateManyWithoutUserNestedInputObjectSchema } from './SessionUpdateManyWithoutUserNestedInput.schema';
import { DossierUpdateManyWithoutUserNestedInputObjectSchema } from './DossierUpdateManyWithoutUserNestedInput.schema';
import { DossierUpdateManyWithoutMedecinNestedInputObjectSchema } from './DossierUpdateManyWithoutMedecinNestedInput.schema';
import { CommentaireUpdateManyWithoutUserNestedInputObjectSchema } from './CommentaireUpdateManyWithoutUserNestedInput.schema';
import { SendListUpdateManyWithoutUserNestedInputObjectSchema } from './SendListUpdateManyWithoutUserNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    nom: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    prenom: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    email: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => NullableEnumRoleFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    departement: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    departements: z
      .union([
        z.lazy(() => UserUpdatedepartementsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    sessions: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    dossiers: z
      .lazy(() => DossierUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    dossiersMedecin: z
      .lazy(() => DossierUpdateManyWithoutMedecinNestedInputObjectSchema)
      .optional(),
    commentaires: z
      .lazy(() => CommentaireUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    SendList: z
      .lazy(() => SendListUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUpdateInputObjectSchema = Schema;

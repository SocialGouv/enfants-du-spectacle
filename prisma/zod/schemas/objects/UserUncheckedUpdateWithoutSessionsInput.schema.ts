import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { NullableEnumRoleFieldUpdateOperationsInputObjectSchema } from './NullableEnumRoleFieldUpdateOperationsInput.schema';
import { UserUpdatedepartementsInputObjectSchema } from './UserUpdatedepartementsInput.schema';
import { AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AccountUncheckedUpdateManyWithoutUserNestedInput.schema';
import { DossierUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './DossierUncheckedUpdateManyWithoutUserNestedInput.schema';
import { DossierUncheckedUpdateManyWithoutMedecinNestedInputObjectSchema } from './DossierUncheckedUpdateManyWithoutMedecinNestedInput.schema';
import { CommentaireUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './CommentaireUncheckedUpdateManyWithoutUserNestedInput.schema';
import { SendListUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './SendListUncheckedUpdateManyWithoutUserNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z
  .object({
    id: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
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
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    dossiers: z
      .lazy(() => DossierUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    dossiersMedecin: z
      .lazy(
        () => DossierUncheckedUpdateManyWithoutMedecinNestedInputObjectSchema,
      )
      .optional(),
    commentaires: z
      .lazy(
        () => CommentaireUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
      )
      .optional(),
    SendList: z
      .lazy(() => SendListUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateWithoutSessionsInputObjectSchema = Schema;

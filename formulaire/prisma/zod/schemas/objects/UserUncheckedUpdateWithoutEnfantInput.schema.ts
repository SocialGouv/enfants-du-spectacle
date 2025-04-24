import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { NullableEnumRoleFieldUpdateOperationsInputObjectSchema } from './NullableEnumRoleFieldUpdateOperationsInput.schema';
import { UserUpdatedepartementsInputObjectSchema } from './UserUpdatedepartementsInput.schema';
import { AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AccountUncheckedUpdateManyWithoutUserNestedInput.schema';
import { SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './SessionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { DossierUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './DossierUncheckedUpdateManyWithoutUserNestedInput.schema';
import { CommentsUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './CommentsUncheckedUpdateManyWithoutUserNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedUpdateWithoutEnfantInput> = z
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
    telephone: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    fonction: z
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
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
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
    Account: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    Session: z
      .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    dossiers: z
      .lazy(() => DossierUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    comments: z
      .lazy(() => CommentsUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateWithoutEnfantInputObjectSchema = Schema;

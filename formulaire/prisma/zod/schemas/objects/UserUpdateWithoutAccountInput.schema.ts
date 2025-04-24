import { z } from 'zod';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { NullableEnumRoleFieldUpdateOperationsInputObjectSchema } from './NullableEnumRoleFieldUpdateOperationsInput.schema';
import { UserUpdatedepartementsInputObjectSchema } from './UserUpdatedepartementsInput.schema';
import { SessionUpdateManyWithoutUserNestedInputObjectSchema } from './SessionUpdateManyWithoutUserNestedInput.schema';
import { DossierUpdateManyWithoutUserNestedInputObjectSchema } from './DossierUpdateManyWithoutUserNestedInput.schema';
import { EnfantUpdateManyWithoutPopulatedByNestedInputObjectSchema } from './EnfantUpdateManyWithoutPopulatedByNestedInput.schema';
import { CommentsUpdateManyWithoutUserNestedInputObjectSchema } from './CommentsUpdateManyWithoutUserNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateWithoutAccountInput> = z
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
    Session: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    dossiers: z
      .lazy(() => DossierUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    Enfant: z
      .lazy(() => EnfantUpdateManyWithoutPopulatedByNestedInputObjectSchema)
      .optional(),
    comments: z
      .lazy(() => CommentsUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUpdateWithoutAccountInputObjectSchema = Schema;

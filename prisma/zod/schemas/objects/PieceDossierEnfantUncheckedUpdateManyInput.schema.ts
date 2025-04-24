import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { EnumJustificatifEnfantFieldUpdateOperationsInputObjectSchema } from './EnumJustificatifEnfantFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';
import { NullableEnumSTATUT_PIECEFieldUpdateOperationsInputObjectSchema } from './NullableEnumSTATUT_PIECEFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantUncheckedUpdateManyInput> = z
  .object({
    id: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    enfantId: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    dossierId: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    externalId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => JustificatifEnfantSchema),
        z.lazy(
          () => EnumJustificatifEnfantFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional(),
    link: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    statut: z
      .union([
        z.lazy(() => STATUT_PIECESchema),
        z.lazy(
          () => NullableEnumSTATUT_PIECEFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const PieceDossierEnfantUncheckedUpdateManyInputObjectSchema = Schema;

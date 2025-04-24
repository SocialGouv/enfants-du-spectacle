import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NatureCachetSchema } from '../enums/NatureCachet.schema';
import { NullableEnumNatureCachetFieldUpdateOperationsInputObjectSchema } from './NullableEnumNatureCachetFieldUpdateOperationsInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationUncheckedUpdateWithoutEnfantInput> =
  z
    .object({
      id: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      typeRemuneration: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      natureCachet: z
        .union([
          z.lazy(() => NatureCachetSchema),
          z.lazy(
            () =>
              NullableEnumNatureCachetFieldUpdateOperationsInputObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      autreNatureCachet: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      montant: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      nombre: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      nombreLignes: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      totalDadr: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      comment: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RemunerationUncheckedUpdateWithoutEnfantInputObjectSchema = Schema;

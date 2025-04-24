import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUncheckedUpdateManyWithoutDemandeurInput> =
  z
    .object({
      id: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      email: z
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
      phone: z
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
      conventionCollectiveCode: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      otherConventionCollective: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const DemandeurUncheckedUpdateManyWithoutDemandeurInputObjectSchema =
  Schema;

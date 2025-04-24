import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DossierUncheckedUpdateManyWithoutDemandeurNestedInputObjectSchema } from './DossierUncheckedUpdateManyWithoutDemandeurNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUncheckedUpdateWithoutSocieteProductionInput> =
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
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      nom: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      prenom: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
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
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      dossiers: z
        .lazy(
          () =>
            DossierUncheckedUpdateManyWithoutDemandeurNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const DemandeurUncheckedUpdateWithoutSocieteProductionInputObjectSchema =
  Schema;

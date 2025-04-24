import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { SocieteProductionUpdateOneRequiredWithoutDemandeursNestedInputObjectSchema } from './SocieteProductionUpdateOneRequiredWithoutDemandeursNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUpdateWithoutDossiersInput> = z
  .object({
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
    societeProduction: z
      .lazy(
        () =>
          SocieteProductionUpdateOneRequiredWithoutDemandeursNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const DemandeurUpdateWithoutDossiersInputObjectSchema = Schema;

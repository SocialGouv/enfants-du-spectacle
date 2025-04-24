import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUncheckedUpdateWithoutDemandeurInput> =
  z
    .object({
      id: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      nom: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      siret: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      siren: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
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
      naf: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      raisonSociale: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      adresse: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      adresseCodePostal: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      adresseCodeCommune: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      formeJuridique: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SocieteProductionUncheckedUpdateWithoutDemandeurInputObjectSchema =
  Schema;

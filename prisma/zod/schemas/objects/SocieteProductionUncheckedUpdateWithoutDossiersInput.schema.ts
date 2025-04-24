import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DemandeurUncheckedUpdateManyWithoutSocieteProductionNestedInputObjectSchema } from './DemandeurUncheckedUpdateManyWithoutSocieteProductionNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUncheckedUpdateWithoutDossiersInput> =
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
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      siret: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      siren: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      departement: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      naf: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      raisonSociale: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      adresse: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      adresseCodePostal: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      adresseCodeCommune: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      formeJuridique: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      conventionCollectiveCode: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      otherConventionCollective: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      demandeurs: z
        .lazy(
          () =>
            DemandeurUncheckedUpdateManyWithoutSocieteProductionNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const SocieteProductionUncheckedUpdateWithoutDossiersInputObjectSchema =
  Schema;

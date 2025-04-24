import { z } from 'zod';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { SocieteProductionUpdateOneWithoutDemandeurNestedInputObjectSchema } from './SocieteProductionUpdateOneWithoutDemandeurNestedInput.schema';
import { DossierUpdateManyWithoutDemandeurNestedInputObjectSchema } from './DossierUpdateManyWithoutDemandeurNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUpdateInput> = z
  .object({
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
    societeProduction: z
      .lazy(
        () => SocieteProductionUpdateOneWithoutDemandeurNestedInputObjectSchema,
      )
      .optional(),
    dossiers: z
      .lazy(() => DossierUpdateManyWithoutDemandeurNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const DemandeurUpdateInputObjectSchema = Schema;

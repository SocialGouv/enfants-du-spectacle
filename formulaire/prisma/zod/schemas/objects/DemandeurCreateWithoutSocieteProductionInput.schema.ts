import { z } from 'zod';
import { DossierCreateNestedManyWithoutDemandeurInputObjectSchema } from './DossierCreateNestedManyWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateWithoutSocieteProductionInput> = z
  .object({
    email: z.string().optional().nullable(),
    nom: z.string().optional().nullable(),
    prenom: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    fonction: z.string().optional().nullable(),
    conventionCollectiveCode: z.string().optional().nullable(),
    otherConventionCollective: z.string().optional().nullable(),
    dossiers: z
      .lazy(() => DossierCreateNestedManyWithoutDemandeurInputObjectSchema)
      .optional(),
  })
  .strict();

export const DemandeurCreateWithoutSocieteProductionInputObjectSchema = Schema;

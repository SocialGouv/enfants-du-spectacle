import { z } from 'zod';
import { DossierCreateNestedManyWithoutDemandeurInputObjectSchema } from './DossierCreateNestedManyWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateWithoutSocieteProductionInput> = z
  .object({
    email: z.string(),
    nom: z.string(),
    prenom: z.string(),
    phone: z.string().optional().nullable(),
    fonction: z.string(),
    dossiers: z
      .lazy(() => DossierCreateNestedManyWithoutDemandeurInputObjectSchema)
      .optional(),
  })
  .strict();

export const DemandeurCreateWithoutSocieteProductionInputObjectSchema = Schema;

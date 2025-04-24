import { z } from 'zod';
import { DossierUncheckedCreateNestedManyWithoutDemandeurInputObjectSchema } from './DossierUncheckedCreateNestedManyWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    email: z.string(),
    nom: z.string(),
    prenom: z.string(),
    phone: z.string().optional().nullable(),
    fonction: z.string(),
    societeProductionId: z.number(),
    dossiers: z
      .lazy(
        () => DossierUncheckedCreateNestedManyWithoutDemandeurInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const DemandeurUncheckedCreateInputObjectSchema = Schema;

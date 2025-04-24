import { z } from 'zod';
import { DossierUncheckedCreateNestedManyWithoutDemandeurInputObjectSchema } from './DossierUncheckedCreateNestedManyWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    email: z.string().optional().nullable(),
    nom: z.string().optional().nullable(),
    prenom: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    fonction: z.string().optional().nullable(),
    conventionCollectiveCode: z.string().optional().nullable(),
    otherConventionCollective: z.string().optional().nullable(),
    societeProductionId: z.number().optional().nullable(),
    dossiers: z
      .lazy(
        () => DossierUncheckedCreateNestedManyWithoutDemandeurInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const DemandeurUncheckedCreateInputObjectSchema = Schema;

import { z } from 'zod';
import { SocieteProductionCreateNestedOneWithoutDemandeurInputObjectSchema } from './SocieteProductionCreateNestedOneWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateWithoutDossiersInput> = z
  .object({
    email: z.string().optional().nullable(),
    nom: z.string().optional().nullable(),
    prenom: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    fonction: z.string().optional().nullable(),
    conventionCollectiveCode: z.string().optional().nullable(),
    otherConventionCollective: z.string().optional().nullable(),
    societeProduction: z
      .lazy(
        () => SocieteProductionCreateNestedOneWithoutDemandeurInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const DemandeurCreateWithoutDossiersInputObjectSchema = Schema;

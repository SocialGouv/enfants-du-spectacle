import { z } from 'zod';
import { SocieteProductionCreateNestedOneWithoutDemandeursInputObjectSchema } from './SocieteProductionCreateNestedOneWithoutDemandeursInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateWithoutDossiersInput> = z
  .object({
    email: z.string(),
    nom: z.string(),
    prenom: z.string(),
    phone: z.string().optional().nullable(),
    fonction: z.string(),
    societeProduction: z.lazy(
      () => SocieteProductionCreateNestedOneWithoutDemandeursInputObjectSchema,
    ),
  })
  .strict();

export const DemandeurCreateWithoutDossiersInputObjectSchema = Schema;

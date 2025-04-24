import { z } from 'zod';
import { SocieteProductionCreateNestedOneWithoutDemandeursInputObjectSchema } from './SocieteProductionCreateNestedOneWithoutDemandeursInput.schema';
import { DossierCreateNestedManyWithoutDemandeurInputObjectSchema } from './DossierCreateNestedManyWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateInput> = z
  .object({
    email: z.string(),
    nom: z.string(),
    prenom: z.string(),
    phone: z.string().optional().nullable(),
    fonction: z.string(),
    societeProduction: z.lazy(
      () => SocieteProductionCreateNestedOneWithoutDemandeursInputObjectSchema,
    ),
    dossiers: z
      .lazy(() => DossierCreateNestedManyWithoutDemandeurInputObjectSchema)
      .optional(),
  })
  .strict();

export const DemandeurCreateInputObjectSchema = Schema;

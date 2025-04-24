import { z } from 'zod';
import { DemandeurCreateNestedManyWithoutSocieteProductionInputObjectSchema } from './DemandeurCreateNestedManyWithoutSocieteProductionInput.schema';
import { DossierCreateNestedManyWithoutSocieteProductionInputObjectSchema } from './DossierCreateNestedManyWithoutSocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCreateInput> = z
  .object({
    nom: z.string(),
    siret: z.string(),
    siren: z.string(),
    departement: z.string(),
    naf: z.string(),
    raisonSociale: z.string(),
    adresse: z.string(),
    adresseCodePostal: z.string(),
    adresseCodeCommune: z.string(),
    formeJuridique: z.string(),
    conventionCollectiveCode: z.string(),
    otherConventionCollective: z.string().optional().nullable(),
    demandeurs: z
      .lazy(
        () =>
          DemandeurCreateNestedManyWithoutSocieteProductionInputObjectSchema,
      )
      .optional(),
    dossiers: z
      .lazy(
        () => DossierCreateNestedManyWithoutSocieteProductionInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const SocieteProductionCreateInputObjectSchema = Schema;

import { z } from 'zod';
import { DossierCreateNestedManyWithoutSocieteProductionInputObjectSchema } from './DossierCreateNestedManyWithoutSocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCreateWithoutDemandeursInput> =
  z
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
      dossiers: z
        .lazy(
          () =>
            DossierCreateNestedManyWithoutSocieteProductionInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const SocieteProductionCreateWithoutDemandeursInputObjectSchema = Schema;

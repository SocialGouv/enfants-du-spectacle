import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCreateManyInput> = z
  .object({
    id: z.number().optional(),
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
  })
  .strict();

export const SocieteProductionCreateManyInputObjectSchema = Schema;

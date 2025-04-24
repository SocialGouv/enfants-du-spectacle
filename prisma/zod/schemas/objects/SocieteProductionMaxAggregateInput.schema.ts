import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    nom: z.literal(true).optional(),
    siret: z.literal(true).optional(),
    siren: z.literal(true).optional(),
    departement: z.literal(true).optional(),
    naf: z.literal(true).optional(),
    raisonSociale: z.literal(true).optional(),
    adresse: z.literal(true).optional(),
    adresseCodePostal: z.literal(true).optional(),
    adresseCodeCommune: z.literal(true).optional(),
    formeJuridique: z.literal(true).optional(),
    conventionCollectiveCode: z.literal(true).optional(),
    otherConventionCollective: z.literal(true).optional(),
  })
  .strict();

export const SocieteProductionMaxAggregateInputObjectSchema = Schema;

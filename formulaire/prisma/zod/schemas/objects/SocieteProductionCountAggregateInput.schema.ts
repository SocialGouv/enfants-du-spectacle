import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCountAggregateInputType> = z
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
    _all: z.literal(true).optional(),
  })
  .strict();

export const SocieteProductionCountAggregateInputObjectSchema = Schema;

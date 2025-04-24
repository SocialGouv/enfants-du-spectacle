import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    nom: z.literal(true).optional(),
    statut: z.literal(true).optional(),
    categorie: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    presentation: z.literal(true).optional(),
    dateDebut: z.literal(true).optional(),
    dateFin: z.literal(true).optional(),
    number: z.literal(true).optional(),
    dateCreation: z.literal(true).optional(),
    dateDerniereModification: z.literal(true).optional(),
    cdc: z.literal(true).optional(),
    scenario: z.literal(true).optional(),
    securite: z.literal(true).optional(),
    complementaire: z.literal(true).optional(),
    dateDepot: z.literal(true).optional(),
    demandeurId: z.literal(true).optional(),
    commissionDate: z.literal(true).optional(),
    commissionString: z.literal(true).optional(),
  })
  .strict();

export const DossierMaxAggregateInputObjectSchema = Schema;

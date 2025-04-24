import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    nom: z.literal(true).optional(),
    statut: z.literal(true).optional(),
    categorie: z.literal(true).optional(),
    commissionId: z.literal(true).optional(),
    societeProductionId: z.literal(true).optional(),
    numeroDS: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    medecinId: z.literal(true).optional(),
    demandeurId: z.literal(true).optional(),
    presentation: z.literal(true).optional(),
    conventionCollectiveCode: z.literal(true).optional(),
    otherConventionCollective: z.literal(true).optional(),
    dateDebut: z.literal(true).optional(),
    dateFin: z.literal(true).optional(),
    externalId: z.literal(true).optional(),
    number: z.literal(true).optional(),
    dateDerniereModification: z.literal(true).optional(),
    cdc: z.literal(true).optional(),
    dateDepot: z.literal(true).optional(),
    statusNotification: z.literal(true).optional(),
    source: z.literal(true).optional(),
  })
  .strict();

export const DossierMaxAggregateInputObjectSchema = Schema;

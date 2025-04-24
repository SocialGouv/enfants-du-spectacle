import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    statut: z.lazy(() => SortOrderSchema).optional(),
    categorie: z.lazy(() => SortOrderSchema).optional(),
    commissionId: z.lazy(() => SortOrderSchema).optional(),
    societeProductionId: z.lazy(() => SortOrderSchema).optional(),
    numeroDS: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    medecinId: z.lazy(() => SortOrderSchema).optional(),
    demandeurId: z.lazy(() => SortOrderSchema).optional(),
    presentation: z.lazy(() => SortOrderSchema).optional(),
    conventionCollectiveCode: z.lazy(() => SortOrderSchema).optional(),
    otherConventionCollective: z.lazy(() => SortOrderSchema).optional(),
    dateDebut: z.lazy(() => SortOrderSchema).optional(),
    dateFin: z.lazy(() => SortOrderSchema).optional(),
    externalId: z.lazy(() => SortOrderSchema).optional(),
    number: z.lazy(() => SortOrderSchema).optional(),
    dateDerniereModification: z.lazy(() => SortOrderSchema).optional(),
    cdc: z.lazy(() => SortOrderSchema).optional(),
    dateDepot: z.lazy(() => SortOrderSchema).optional(),
    statusNotification: z.lazy(() => SortOrderSchema).optional(),
    source: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const DossierMaxOrderByAggregateInputObjectSchema = Schema;

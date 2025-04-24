import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    statut: z.lazy(() => SortOrderSchema).optional(),
    categorie: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    presentation: z.lazy(() => SortOrderSchema).optional(),
    dateDebut: z.lazy(() => SortOrderSchema).optional(),
    dateFin: z.lazy(() => SortOrderSchema).optional(),
    number: z.lazy(() => SortOrderSchema).optional(),
    dateCreation: z.lazy(() => SortOrderSchema).optional(),
    dateDerniereModification: z.lazy(() => SortOrderSchema).optional(),
    cdc: z.lazy(() => SortOrderSchema).optional(),
    scenario: z.lazy(() => SortOrderSchema).optional(),
    securite: z.lazy(() => SortOrderSchema).optional(),
    complementaire: z.lazy(() => SortOrderSchema).optional(),
    dateDepot: z.lazy(() => SortOrderSchema).optional(),
    demandeurId: z.lazy(() => SortOrderSchema).optional(),
    commissionDate: z.lazy(() => SortOrderSchema).optional(),
    commissionString: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const DossierMaxOrderByAggregateInputObjectSchema = Schema;

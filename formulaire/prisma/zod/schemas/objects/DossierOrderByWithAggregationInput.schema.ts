import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DossierCountOrderByAggregateInputObjectSchema } from './DossierCountOrderByAggregateInput.schema';
import { DossierAvgOrderByAggregateInputObjectSchema } from './DossierAvgOrderByAggregateInput.schema';
import { DossierMaxOrderByAggregateInputObjectSchema } from './DossierMaxOrderByAggregateInput.schema';
import { DossierMinOrderByAggregateInputObjectSchema } from './DossierMinOrderByAggregateInput.schema';
import { DossierSumOrderByAggregateInputObjectSchema } from './DossierSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    nom: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    statut: z.lazy(() => SortOrderSchema).optional(),
    categorie: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    collaboratorIds: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    justificatifs: z.lazy(() => SortOrderSchema).optional(),
    scenesSensibles: z.lazy(() => SortOrderSchema).optional(),
    presentation: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dateDebut: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dateFin: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    number: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dateCreation: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dateDerniereModification: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    cdc: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    scenario: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    securite: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    complementaire: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dateDepot: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    demandeurId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    commissionDate: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    commissionString: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => DossierCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => DossierAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => DossierMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => DossierMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => DossierSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const DossierOrderByWithAggregationInputObjectSchema = Schema;

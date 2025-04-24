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
    nom: z.lazy(() => SortOrderSchema).optional(),
    statut: z.lazy(() => SortOrderSchema).optional(),
    categorie: z.lazy(() => SortOrderSchema).optional(),
    commissionId: z.lazy(() => SortOrderSchema).optional(),
    societeProductionId: z.lazy(() => SortOrderSchema).optional(),
    numeroDS: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    userId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    medecinId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    demandeurId: z.lazy(() => SortOrderSchema).optional(),
    justificatifs: z.lazy(() => SortOrderSchema).optional(),
    scenesSensibles: z.lazy(() => SortOrderSchema).optional(),
    presentation: z.lazy(() => SortOrderSchema).optional(),
    conventionCollectiveCode: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    otherConventionCollective: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dateDebut: z.lazy(() => SortOrderSchema).optional(),
    dateFin: z.lazy(() => SortOrderSchema).optional(),
    externalId: z
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
    dateDepot: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    statusNotification: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    source: z
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

import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PieceDossierCountOrderByAggregateInputObjectSchema } from './PieceDossierCountOrderByAggregateInput.schema';
import { PieceDossierAvgOrderByAggregateInputObjectSchema } from './PieceDossierAvgOrderByAggregateInput.schema';
import { PieceDossierMaxOrderByAggregateInputObjectSchema } from './PieceDossierMaxOrderByAggregateInput.schema';
import { PieceDossierMinOrderByAggregateInputObjectSchema } from './PieceDossierMinOrderByAggregateInput.schema';
import { PieceDossierSumOrderByAggregateInputObjectSchema } from './PieceDossierSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    externalId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    link: z.lazy(() => SortOrderSchema).optional(),
    statut: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => PieceDossierCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => PieceDossierAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => PieceDossierMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => PieceDossierMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => PieceDossierSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const PieceDossierOrderByWithAggregationInputObjectSchema = Schema;

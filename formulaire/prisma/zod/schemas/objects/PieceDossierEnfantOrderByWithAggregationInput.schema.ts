import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PieceDossierEnfantCountOrderByAggregateInputObjectSchema } from './PieceDossierEnfantCountOrderByAggregateInput.schema';
import { PieceDossierEnfantAvgOrderByAggregateInputObjectSchema } from './PieceDossierEnfantAvgOrderByAggregateInput.schema';
import { PieceDossierEnfantMaxOrderByAggregateInputObjectSchema } from './PieceDossierEnfantMaxOrderByAggregateInput.schema';
import { PieceDossierEnfantMinOrderByAggregateInputObjectSchema } from './PieceDossierEnfantMinOrderByAggregateInput.schema';
import { PieceDossierEnfantSumOrderByAggregateInputObjectSchema } from './PieceDossierEnfantSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      nom: z.lazy(() => SortOrderSchema).optional(),
      enfantId: z.lazy(() => SortOrderSchema).optional(),
      externalId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      link: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      statut: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => PieceDossierEnfantCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => PieceDossierEnfantAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => PieceDossierEnfantMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => PieceDossierEnfantMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => PieceDossierEnfantSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();

export const PieceDossierEnfantOrderByWithAggregationInputObjectSchema = Schema;

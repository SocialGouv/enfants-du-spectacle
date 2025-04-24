import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CommissionCountOrderByAggregateInputObjectSchema } from './CommissionCountOrderByAggregateInput.schema';
import { CommissionAvgOrderByAggregateInputObjectSchema } from './CommissionAvgOrderByAggregateInput.schema';
import { CommissionMaxOrderByAggregateInputObjectSchema } from './CommissionMaxOrderByAggregateInput.schema';
import { CommissionMinOrderByAggregateInputObjectSchema } from './CommissionMinOrderByAggregateInput.schema';
import { CommissionSumOrderByAggregateInputObjectSchema } from './CommissionSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    departement: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
    dateLimiteDepot: z.lazy(() => SortOrderSchema).optional(),
    lastSent: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    archived: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => CommissionCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => CommissionAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => CommissionMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => CommissionMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => CommissionSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommissionOrderByWithAggregationInputObjectSchema = Schema;

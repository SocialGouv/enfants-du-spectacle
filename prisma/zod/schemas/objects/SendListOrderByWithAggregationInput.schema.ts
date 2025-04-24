import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { SendListCountOrderByAggregateInputObjectSchema } from './SendListCountOrderByAggregateInput.schema';
import { SendListAvgOrderByAggregateInputObjectSchema } from './SendListAvgOrderByAggregateInput.schema';
import { SendListMaxOrderByAggregateInputObjectSchema } from './SendListMaxOrderByAggregateInput.schema';
import { SendListMinOrderByAggregateInputObjectSchema } from './SendListMinOrderByAggregateInput.schema';
import { SendListSumOrderByAggregateInputObjectSchema } from './SendListSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    send: z.lazy(() => SortOrderSchema).optional(),
    lastSent: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    commissionId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => SendListCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => SendListAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => SendListMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => SendListMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => SendListSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const SendListOrderByWithAggregationInputObjectSchema = Schema;

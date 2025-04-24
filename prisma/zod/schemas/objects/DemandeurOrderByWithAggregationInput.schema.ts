import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DemandeurCountOrderByAggregateInputObjectSchema } from './DemandeurCountOrderByAggregateInput.schema';
import { DemandeurAvgOrderByAggregateInputObjectSchema } from './DemandeurAvgOrderByAggregateInput.schema';
import { DemandeurMaxOrderByAggregateInputObjectSchema } from './DemandeurMaxOrderByAggregateInput.schema';
import { DemandeurMinOrderByAggregateInputObjectSchema } from './DemandeurMinOrderByAggregateInput.schema';
import { DemandeurSumOrderByAggregateInputObjectSchema } from './DemandeurSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    prenom: z.lazy(() => SortOrderSchema).optional(),
    phone: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    fonction: z.lazy(() => SortOrderSchema).optional(),
    societeProductionId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => DemandeurCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => DemandeurAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => DemandeurMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => DemandeurMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => DemandeurSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const DemandeurOrderByWithAggregationInputObjectSchema = Schema;

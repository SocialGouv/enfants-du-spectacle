import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RemunerationCountOrderByAggregateInputObjectSchema } from './RemunerationCountOrderByAggregateInput.schema';
import { RemunerationAvgOrderByAggregateInputObjectSchema } from './RemunerationAvgOrderByAggregateInput.schema';
import { RemunerationMaxOrderByAggregateInputObjectSchema } from './RemunerationMaxOrderByAggregateInput.schema';
import { RemunerationMinOrderByAggregateInputObjectSchema } from './RemunerationMinOrderByAggregateInput.schema';
import { RemunerationSumOrderByAggregateInputObjectSchema } from './RemunerationSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    typeRemuneration: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    natureCachet: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    autreNatureCachet: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    montant: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    nombre: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    nombreLignes: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    totalDadr: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    comment: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    enfantId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => RemunerationCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => RemunerationAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => RemunerationMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => RemunerationMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => RemunerationSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const RemunerationOrderByWithAggregationInputObjectSchema = Schema;

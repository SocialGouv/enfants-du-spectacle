import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DossierOrderByRelationAggregateInputObjectSchema } from './DossierOrderByRelationAggregateInput.schema';
import { SendListOrderByRelationAggregateInputObjectSchema } from './SendListOrderByRelationAggregateInput.schema';
import { CommissionOrderByRelevanceInputObjectSchema } from './CommissionOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionOrderByWithRelationAndSearchRelevanceInput> =
  z
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
      dossiers: z
        .lazy(() => DossierOrderByRelationAggregateInputObjectSchema)
        .optional(),
      SendList: z
        .lazy(() => SendListOrderByRelationAggregateInputObjectSchema)
        .optional(),
      _relevance: z
        .lazy(() => CommissionOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const CommissionOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;

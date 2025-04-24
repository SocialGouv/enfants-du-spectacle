import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { SocieteProductionOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './SocieteProductionOrderByWithRelationAndSearchRelevanceInput.schema';
import { DossierOrderByRelationAggregateInputObjectSchema } from './DossierOrderByRelationAggregateInput.schema';
import { DemandeurOrderByRelevanceInputObjectSchema } from './DemandeurOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurOrderByWithRelationAndSearchRelevanceInput> =
  z
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
      societeProduction: z
        .lazy(
          () =>
            SocieteProductionOrderByWithRelationAndSearchRelevanceInputObjectSchema,
        )
        .optional(),
      dossiers: z
        .lazy(() => DossierOrderByRelationAggregateInputObjectSchema)
        .optional(),
      _relevance: z
        .lazy(() => DemandeurOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const DemandeurOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;

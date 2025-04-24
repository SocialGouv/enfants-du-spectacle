import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { SocieteProductionCountOrderByAggregateInputObjectSchema } from './SocieteProductionCountOrderByAggregateInput.schema';
import { SocieteProductionAvgOrderByAggregateInputObjectSchema } from './SocieteProductionAvgOrderByAggregateInput.schema';
import { SocieteProductionMaxOrderByAggregateInputObjectSchema } from './SocieteProductionMaxOrderByAggregateInput.schema';
import { SocieteProductionMinOrderByAggregateInputObjectSchema } from './SocieteProductionMinOrderByAggregateInput.schema';
import { SocieteProductionSumOrderByAggregateInputObjectSchema } from './SocieteProductionSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    siret: z.lazy(() => SortOrderSchema).optional(),
    siren: z.lazy(() => SortOrderSchema).optional(),
    departement: z.lazy(() => SortOrderSchema).optional(),
    naf: z.lazy(() => SortOrderSchema).optional(),
    raisonSociale: z.lazy(() => SortOrderSchema).optional(),
    adresse: z.lazy(() => SortOrderSchema).optional(),
    adresseCodePostal: z.lazy(() => SortOrderSchema).optional(),
    adresseCodeCommune: z.lazy(() => SortOrderSchema).optional(),
    formeJuridique: z.lazy(() => SortOrderSchema).optional(),
    conventionCollectiveCode: z.lazy(() => SortOrderSchema).optional(),
    otherConventionCollective: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => SocieteProductionCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => SocieteProductionAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => SocieteProductionMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => SocieteProductionMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => SocieteProductionSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const SocieteProductionOrderByWithAggregationInputObjectSchema = Schema;

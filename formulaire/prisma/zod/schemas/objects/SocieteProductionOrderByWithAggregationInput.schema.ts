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
    nom: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    siret: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    siren: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    departement: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    naf: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    raisonSociale: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    adresse: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    adresseCodePostal: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    adresseCodeCommune: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    formeJuridique: z
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

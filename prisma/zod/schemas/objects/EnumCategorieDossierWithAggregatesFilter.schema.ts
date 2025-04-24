import { z } from 'zod';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { NestedEnumCategorieDossierWithAggregatesFilterObjectSchema } from './NestedEnumCategorieDossierWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCategorieDossierFilterObjectSchema } from './NestedEnumCategorieDossierFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumCategorieDossierWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => CategorieDossierSchema).optional(),
    in: z
      .union([
        z.lazy(() => CategorieDossierSchema).array(),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => CategorieDossierSchema).array(),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => CategorieDossierSchema),
        z.lazy(
          () => NestedEnumCategorieDossierWithAggregatesFilterObjectSchema,
        ),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumCategorieDossierFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumCategorieDossierFilterObjectSchema).optional(),
  })
  .strict();

export const EnumCategorieDossierWithAggregatesFilterObjectSchema = Schema;

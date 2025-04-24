import { z } from 'zod';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumJustificatifEnfantFilterObjectSchema } from './NestedEnumJustificatifEnfantFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumJustificatifEnfantWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => JustificatifEnfantSchema).optional(),
      in: z
        .union([
          z.lazy(() => JustificatifEnfantSchema).array(),
          z.lazy(() => JustificatifEnfantSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.lazy(() => JustificatifEnfantSchema).array(),
          z.lazy(() => JustificatifEnfantSchema),
        ])
        .optional(),
      not: z
        .union([
          z.lazy(() => JustificatifEnfantSchema),
          z.lazy(
            () => NestedEnumJustificatifEnfantWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumJustificatifEnfantFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumJustificatifEnfantFilterObjectSchema)
        .optional(),
    })
    .strict();

export const NestedEnumJustificatifEnfantWithAggregatesFilterObjectSchema =
  Schema;

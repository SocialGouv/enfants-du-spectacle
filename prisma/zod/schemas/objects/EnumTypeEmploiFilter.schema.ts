import { z } from 'zod';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { NestedEnumTypeEmploiFilterObjectSchema } from './NestedEnumTypeEmploiFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumTypeEmploiFilter> = z
  .object({
    equals: z.lazy(() => TypeEmploiSchema).optional(),
    in: z
      .union([
        z.lazy(() => TypeEmploiSchema).array(),
        z.lazy(() => TypeEmploiSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => TypeEmploiSchema).array(),
        z.lazy(() => TypeEmploiSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => TypeEmploiSchema),
        z.lazy(() => NestedEnumTypeEmploiFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumTypeEmploiFilterObjectSchema = Schema;

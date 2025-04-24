import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommissionScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => CommissionScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommissionScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommissionScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => CommissionScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    departement: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    date: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    dateLimiteDepot: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    lastSent: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    archived: z
      .union([
        z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema),
        z.boolean(),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const CommissionScalarWhereWithAggregatesInputObjectSchema = Schema;

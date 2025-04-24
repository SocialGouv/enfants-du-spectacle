import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SendListScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => SendListScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SendListScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SendListScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => SendListScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    send: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    lastSent: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    commissionId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    userId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
  })
  .strict();

export const SendListScalarWhereWithAggregatesInputObjectSchema = Schema;

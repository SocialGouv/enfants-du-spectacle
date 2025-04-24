import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SendListScalarWhereInputObjectSchema),
        z.lazy(() => SendListScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SendListScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SendListScalarWhereInputObjectSchema),
        z.lazy(() => SendListScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    send: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    lastSent: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    commissionId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    userId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
  })
  .strict();

export const SendListScalarWhereInputObjectSchema = Schema;

import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VerificationTokenWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => VerificationTokenWhereInputObjectSchema),
        z.lazy(() => VerificationTokenWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VerificationTokenWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VerificationTokenWhereInputObjectSchema),
        z.lazy(() => VerificationTokenWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    identifier: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    token: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    expires: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict();

export const VerificationTokenWhereInputObjectSchema = Schema;

import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { CommissionRelationFilterObjectSchema } from './CommissionRelationFilter.schema';
import { CommissionWhereInputObjectSchema } from './CommissionWhereInput.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SendListWhereInputObjectSchema),
        z.lazy(() => SendListWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SendListWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SendListWhereInputObjectSchema),
        z.lazy(() => SendListWhereInputObjectSchema).array(),
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
    commission: z
      .union([
        z.lazy(() => CommissionRelationFilterObjectSchema),
        z.lazy(() => CommissionWhereInputObjectSchema),
      ])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const SendListWhereInputObjectSchema = Schema;

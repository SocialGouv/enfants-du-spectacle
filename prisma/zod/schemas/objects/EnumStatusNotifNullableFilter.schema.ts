import { z } from 'zod';
import { StatusNotifSchema } from '../enums/StatusNotif.schema';
import { NestedEnumStatusNotifNullableFilterObjectSchema } from './NestedEnumStatusNotifNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumStatusNotifNullableFilter> = z
  .object({
    equals: z
      .lazy(() => StatusNotifSchema)
      .optional()
      .nullable(),
    in: z
      .union([
        z.lazy(() => StatusNotifSchema).array(),
        z.lazy(() => StatusNotifSchema),
      ])
      .optional()
      .nullable(),
    notIn: z
      .union([
        z.lazy(() => StatusNotifSchema).array(),
        z.lazy(() => StatusNotifSchema),
      ])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => StatusNotifSchema),
        z.lazy(() => NestedEnumStatusNotifNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const EnumStatusNotifNullableFilterObjectSchema = Schema;

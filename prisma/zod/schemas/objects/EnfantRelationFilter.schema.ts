import { z } from 'zod';
import { EnfantWhereInputObjectSchema } from './EnfantWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantRelationFilter> = z
  .object({
    is: z
      .lazy(() => EnfantWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => EnfantWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const EnfantRelationFilterObjectSchema = Schema;

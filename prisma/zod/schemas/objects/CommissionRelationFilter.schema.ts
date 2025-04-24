import { z } from 'zod';
import { CommissionWhereInputObjectSchema } from './CommissionWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionRelationFilter> = z
  .object({
    is: z
      .lazy(() => CommissionWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => CommissionWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const CommissionRelationFilterObjectSchema = Schema;

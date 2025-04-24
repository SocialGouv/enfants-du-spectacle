import { z } from 'zod';
import { DemandeurWhereInputObjectSchema } from './DemandeurWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurRelationFilter> = z
  .object({
    is: z
      .lazy(() => DemandeurWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => DemandeurWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const DemandeurRelationFilterObjectSchema = Schema;

import { z } from 'zod';
import { DemandeurWhereInputObjectSchema } from './DemandeurWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurListRelationFilter> = z
  .object({
    every: z.lazy(() => DemandeurWhereInputObjectSchema).optional(),
    some: z.lazy(() => DemandeurWhereInputObjectSchema).optional(),
    none: z.lazy(() => DemandeurWhereInputObjectSchema).optional(),
  })
  .strict();

export const DemandeurListRelationFilterObjectSchema = Schema;

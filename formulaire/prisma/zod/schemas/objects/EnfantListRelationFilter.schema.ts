import { z } from 'zod';
import { EnfantWhereInputObjectSchema } from './EnfantWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantListRelationFilter> = z
  .object({
    every: z.lazy(() => EnfantWhereInputObjectSchema).optional(),
    some: z.lazy(() => EnfantWhereInputObjectSchema).optional(),
    none: z.lazy(() => EnfantWhereInputObjectSchema).optional(),
  })
  .strict();

export const EnfantListRelationFilterObjectSchema = Schema;

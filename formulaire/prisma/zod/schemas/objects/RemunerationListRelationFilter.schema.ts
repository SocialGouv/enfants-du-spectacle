import { z } from 'zod';
import { RemunerationWhereInputObjectSchema } from './RemunerationWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationListRelationFilter> = z
  .object({
    every: z.lazy(() => RemunerationWhereInputObjectSchema).optional(),
    some: z.lazy(() => RemunerationWhereInputObjectSchema).optional(),
    none: z.lazy(() => RemunerationWhereInputObjectSchema).optional(),
  })
  .strict();

export const RemunerationListRelationFilterObjectSchema = Schema;

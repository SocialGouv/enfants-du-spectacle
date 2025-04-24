import { z } from 'zod';
import { DossierWhereInputObjectSchema } from './DossierWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierListRelationFilter> = z
  .object({
    every: z.lazy(() => DossierWhereInputObjectSchema).optional(),
    some: z.lazy(() => DossierWhereInputObjectSchema).optional(),
    none: z.lazy(() => DossierWhereInputObjectSchema).optional(),
  })
  .strict();

export const DossierListRelationFilterObjectSchema = Schema;

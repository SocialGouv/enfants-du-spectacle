import { z } from 'zod';
import { PieceDossierWhereInputObjectSchema } from './PieceDossierWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierListRelationFilter> = z
  .object({
    every: z.lazy(() => PieceDossierWhereInputObjectSchema).optional(),
    some: z.lazy(() => PieceDossierWhereInputObjectSchema).optional(),
    none: z.lazy(() => PieceDossierWhereInputObjectSchema).optional(),
  })
  .strict();

export const PieceDossierListRelationFilterObjectSchema = Schema;

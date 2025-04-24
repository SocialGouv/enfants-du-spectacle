import { z } from 'zod';
import { PieceDossierEnfantWhereInputObjectSchema } from './PieceDossierEnfantWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantListRelationFilter> = z
  .object({
    every: z.lazy(() => PieceDossierEnfantWhereInputObjectSchema).optional(),
    some: z.lazy(() => PieceDossierEnfantWhereInputObjectSchema).optional(),
    none: z.lazy(() => PieceDossierEnfantWhereInputObjectSchema).optional(),
  })
  .strict();

export const PieceDossierEnfantListRelationFilterObjectSchema = Schema;

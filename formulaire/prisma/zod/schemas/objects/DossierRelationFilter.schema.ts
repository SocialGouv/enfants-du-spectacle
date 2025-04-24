import { z } from 'zod';
import { DossierWhereInputObjectSchema } from './DossierWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierRelationFilter> = z
  .object({
    is: z
      .lazy(() => DossierWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => DossierWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const DossierRelationFilterObjectSchema = Schema;

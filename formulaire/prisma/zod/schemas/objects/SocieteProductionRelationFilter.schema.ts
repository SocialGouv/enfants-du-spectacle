import { z } from 'zod';
import { SocieteProductionWhereInputObjectSchema } from './SocieteProductionWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionRelationFilter> = z
  .object({
    is: z
      .lazy(() => SocieteProductionWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => SocieteProductionWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const SocieteProductionRelationFilterObjectSchema = Schema;

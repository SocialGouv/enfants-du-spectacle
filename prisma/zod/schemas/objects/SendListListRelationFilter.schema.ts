import { z } from 'zod';
import { SendListWhereInputObjectSchema } from './SendListWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListListRelationFilter> = z
  .object({
    every: z.lazy(() => SendListWhereInputObjectSchema).optional(),
    some: z.lazy(() => SendListWhereInputObjectSchema).optional(),
    none: z.lazy(() => SendListWhereInputObjectSchema).optional(),
  })
  .strict();

export const SendListListRelationFilterObjectSchema = Schema;

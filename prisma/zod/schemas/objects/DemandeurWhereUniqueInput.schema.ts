import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    email: z.string().optional(),
  })
  .strict();

export const DemandeurWhereUniqueInputObjectSchema = Schema;

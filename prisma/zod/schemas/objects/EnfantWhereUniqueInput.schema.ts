import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    externalId: z.string().optional(),
  })
  .strict();

export const EnfantWhereUniqueInputObjectSchema = Schema;

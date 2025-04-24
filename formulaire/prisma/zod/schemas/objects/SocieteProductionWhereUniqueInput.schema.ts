import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    siret: z.string().optional(),
  })
  .strict();

export const SocieteProductionWhereUniqueInputObjectSchema = Schema;

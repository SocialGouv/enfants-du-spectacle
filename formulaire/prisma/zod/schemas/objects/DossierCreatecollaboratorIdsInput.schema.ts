import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreatecollaboratorIdsInput> = z
  .object({
    set: z.number().array(),
  })
  .strict();

export const DossierCreatecollaboratorIdsInputObjectSchema = Schema;

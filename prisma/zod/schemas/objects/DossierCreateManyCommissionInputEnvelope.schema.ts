import { z } from 'zod';
import { DossierCreateManyCommissionInputObjectSchema } from './DossierCreateManyCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateManyCommissionInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => DossierCreateManyCommissionInputObjectSchema),
      z.lazy(() => DossierCreateManyCommissionInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const DossierCreateManyCommissionInputEnvelopeObjectSchema = Schema;

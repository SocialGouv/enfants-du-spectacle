import { z } from 'zod';
import { DossierCreateManyDemandeurInputObjectSchema } from './DossierCreateManyDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateManyDemandeurInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => DossierCreateManyDemandeurInputObjectSchema),
      z.lazy(() => DossierCreateManyDemandeurInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const DossierCreateManyDemandeurInputEnvelopeObjectSchema = Schema;

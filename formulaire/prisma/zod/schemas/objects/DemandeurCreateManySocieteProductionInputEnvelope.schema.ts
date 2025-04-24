import { z } from 'zod';
import { DemandeurCreateManySocieteProductionInputObjectSchema } from './DemandeurCreateManySocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateManySocieteProductionInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => DemandeurCreateManySocieteProductionInputObjectSchema),
        z
          .lazy(() => DemandeurCreateManySocieteProductionInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const DemandeurCreateManySocieteProductionInputEnvelopeObjectSchema =
  Schema;

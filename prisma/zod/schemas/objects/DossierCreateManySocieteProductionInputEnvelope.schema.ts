import { z } from 'zod';
import { DossierCreateManySocieteProductionInputObjectSchema } from './DossierCreateManySocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateManySocieteProductionInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => DossierCreateManySocieteProductionInputObjectSchema),
        z
          .lazy(() => DossierCreateManySocieteProductionInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const DossierCreateManySocieteProductionInputEnvelopeObjectSchema =
  Schema;

import { z } from 'zod';
import { DossierCreateManyMedecinInputObjectSchema } from './DossierCreateManyMedecinInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateManyMedecinInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => DossierCreateManyMedecinInputObjectSchema),
      z.lazy(() => DossierCreateManyMedecinInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const DossierCreateManyMedecinInputEnvelopeObjectSchema = Schema;

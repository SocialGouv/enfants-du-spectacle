import { z } from 'zod';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdatejustificatifsInput> = z
  .object({
    set: z
      .lazy(() => JustificatifEnfantSchema)
      .array()
      .optional(),
    push: z
      .union([
        z.lazy(() => JustificatifEnfantSchema),
        z.lazy(() => JustificatifEnfantSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const EnfantUpdatejustificatifsInputObjectSchema = Schema;

import { z } from 'zod';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreatejustificatifsInput> = z
  .object({
    set: z.lazy(() => JustificatifEnfantSchema).array(),
  })
  .strict();

export const EnfantCreatejustificatifsInputObjectSchema = Schema;

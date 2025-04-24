import { z } from 'zod';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreatejustificatifsInput> = z
  .object({
    set: z.lazy(() => JustificatifDossierSchema).array(),
  })
  .strict();

export const DossierCreatejustificatifsInputObjectSchema = Schema;

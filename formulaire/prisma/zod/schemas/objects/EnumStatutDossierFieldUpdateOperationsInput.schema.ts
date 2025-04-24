import { z } from 'zod';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumStatutDossierFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => StatutDossierSchema).optional(),
  })
  .strict();

export const EnumStatutDossierFieldUpdateOperationsInputObjectSchema = Schema;

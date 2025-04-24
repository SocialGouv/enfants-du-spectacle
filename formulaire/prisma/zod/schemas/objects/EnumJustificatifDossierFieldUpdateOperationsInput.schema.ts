import { z } from 'zod';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumJustificatifDossierFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => JustificatifDossierSchema).optional(),
    })
    .strict();

export const EnumJustificatifDossierFieldUpdateOperationsInputObjectSchema =
  Schema;

import { z } from 'zod';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumCategorieDossierFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => CategorieDossierSchema).optional(),
    })
    .strict();

export const EnumCategorieDossierFieldUpdateOperationsInputObjectSchema =
  Schema;

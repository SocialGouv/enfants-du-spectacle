import { z } from 'zod';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumCategorieDossierFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => CategorieDossierSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const NullableEnumCategorieDossierFieldUpdateOperationsInputObjectSchema =
  Schema;

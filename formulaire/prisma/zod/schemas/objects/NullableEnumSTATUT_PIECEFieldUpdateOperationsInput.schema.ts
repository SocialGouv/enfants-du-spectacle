import { z } from 'zod';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumSTATUT_PIECEFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => STATUT_PIECESchema)
        .optional()
        .nullable(),
    })
    .strict();

export const NullableEnumSTATUT_PIECEFieldUpdateOperationsInputObjectSchema =
  Schema;

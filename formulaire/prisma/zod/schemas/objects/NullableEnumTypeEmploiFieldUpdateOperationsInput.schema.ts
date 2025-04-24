import { z } from 'zod';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumTypeEmploiFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => TypeEmploiSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const NullableEnumTypeEmploiFieldUpdateOperationsInputObjectSchema =
  Schema;

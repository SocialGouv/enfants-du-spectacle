import { z } from 'zod';
import { NatureCachetSchema } from '../enums/NatureCachet.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumNatureCachetFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => NatureCachetSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const NullableEnumNatureCachetFieldUpdateOperationsInputObjectSchema =
  Schema;

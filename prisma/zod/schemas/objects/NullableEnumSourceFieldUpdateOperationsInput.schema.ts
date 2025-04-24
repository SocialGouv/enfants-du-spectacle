import { z } from 'zod';
import { SourceSchema } from '../enums/Source.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumSourceFieldUpdateOperationsInput> = z
  .object({
    set: z
      .lazy(() => SourceSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const NullableEnumSourceFieldUpdateOperationsInputObjectSchema = Schema;

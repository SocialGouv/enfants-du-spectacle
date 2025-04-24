import { z } from 'zod';
import { SourcecommentSchema } from '../enums/Sourcecomment.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumSourcecommentFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => SourcecommentSchema).optional(),
  })
  .strict();

export const EnumSourcecommentFieldUpdateOperationsInputObjectSchema = Schema;

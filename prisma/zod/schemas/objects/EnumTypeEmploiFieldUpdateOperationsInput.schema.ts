import { z } from 'zod';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumTypeEmploiFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => TypeEmploiSchema).optional(),
  })
  .strict();

export const EnumTypeEmploiFieldUpdateOperationsInputObjectSchema = Schema;

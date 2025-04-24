import { z } from 'zod';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumTypeConsultationFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => TypeConsultationSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const NullableEnumTypeConsultationFieldUpdateOperationsInputObjectSchema =
  Schema;

import { z } from 'zod';
import { TypeConsultationMedecinSchema } from '../enums/TypeConsultationMedecin.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumTypeConsultationMedecinFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => TypeConsultationMedecinSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const NullableEnumTypeConsultationMedecinFieldUpdateOperationsInputObjectSchema =
  Schema;

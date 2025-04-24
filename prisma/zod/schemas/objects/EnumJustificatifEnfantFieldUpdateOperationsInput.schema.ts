import { z } from 'zod';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumJustificatifEnfantFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => JustificatifEnfantSchema).optional(),
    })
    .strict();

export const EnumJustificatifEnfantFieldUpdateOperationsInputObjectSchema =
  Schema;

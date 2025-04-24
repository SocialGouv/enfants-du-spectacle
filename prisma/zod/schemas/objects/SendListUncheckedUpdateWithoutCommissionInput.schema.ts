import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUncheckedUpdateWithoutCommissionInput> =
  z
    .object({
      id: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      send: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      lastSent: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      userId: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const SendListUncheckedUpdateWithoutCommissionInputObjectSchema = Schema;

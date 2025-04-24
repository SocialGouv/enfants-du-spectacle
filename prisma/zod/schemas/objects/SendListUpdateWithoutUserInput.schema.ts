import { z } from 'zod';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { CommissionUpdateOneRequiredWithoutSendListNestedInputObjectSchema } from './CommissionUpdateOneRequiredWithoutSendListNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUpdateWithoutUserInput> = z
  .object({
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
    commission: z
      .lazy(
        () => CommissionUpdateOneRequiredWithoutSendListNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const SendListUpdateWithoutUserInputObjectSchema = Schema;

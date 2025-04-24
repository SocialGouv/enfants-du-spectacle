import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUncheckedUpdateWithoutDossierInput> =
  z
    .object({
      id: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      seen: z
        .union([
          z.boolean(),
          z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const CommentaireUncheckedUpdateWithoutDossierInputObjectSchema = Schema;

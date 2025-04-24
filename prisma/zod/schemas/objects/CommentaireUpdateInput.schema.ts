import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { UserUpdateOneWithoutCommentairesNestedInputObjectSchema } from './UserUpdateOneWithoutCommentairesNestedInput.schema';
import { DossierUpdateOneWithoutCommentairesNestedInputObjectSchema } from './DossierUpdateOneWithoutCommentairesNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUpdateInput> = z
  .object({
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
    seen: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    user: z
      .lazy(() => UserUpdateOneWithoutCommentairesNestedInputObjectSchema)
      .optional(),
    dossier: z
      .lazy(() => DossierUpdateOneWithoutCommentairesNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommentaireUpdateInputObjectSchema = Schema;

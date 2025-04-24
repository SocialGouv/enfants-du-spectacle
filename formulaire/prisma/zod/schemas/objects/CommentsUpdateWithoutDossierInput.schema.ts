import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { SourcecommentSchema } from '../enums/Sourcecomment.schema';
import { EnumSourcecommentFieldUpdateOperationsInputObjectSchema } from './EnumSourcecommentFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { EnfantUpdateOneWithoutCommentsNestedInputObjectSchema } from './EnfantUpdateOneWithoutCommentsNestedInput.schema';
import { CommentsUpdateOneWithoutCommentsNestedInputObjectSchema } from './CommentsUpdateOneWithoutCommentsNestedInput.schema';
import { CommentsUpdateManyWithoutParentCommentNestedInputObjectSchema } from './CommentsUpdateManyWithoutParentCommentNestedInput.schema';
import { UserUpdateOneWithoutCommentsNestedInputObjectSchema } from './UserUpdateOneWithoutCommentsNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpdateWithoutDossierInput> = z
  .object({
    text: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    source: z
      .union([
        z.lazy(() => SourcecommentSchema),
        z.lazy(() => EnumSourcecommentFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    externalUserId: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    sender: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    seen: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    enfant: z
      .lazy(() => EnfantUpdateOneWithoutCommentsNestedInputObjectSchema)
      .optional(),
    parentComment: z
      .lazy(() => CommentsUpdateOneWithoutCommentsNestedInputObjectSchema)
      .optional(),
    Comments: z
      .lazy(() => CommentsUpdateManyWithoutParentCommentNestedInputObjectSchema)
      .optional(),
    User: z
      .lazy(() => UserUpdateOneWithoutCommentsNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const CommentsUpdateWithoutDossierInputObjectSchema = Schema;

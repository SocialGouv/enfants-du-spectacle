import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './objects/CommentsWhereUniqueInput.schema';
import { CommentsCreateInputObjectSchema } from './objects/CommentsCreateInput.schema';
import { CommentsUncheckedCreateInputObjectSchema } from './objects/CommentsUncheckedCreateInput.schema';
import { CommentsUpdateInputObjectSchema } from './objects/CommentsUpdateInput.schema';
import { CommentsUncheckedUpdateInputObjectSchema } from './objects/CommentsUncheckedUpdateInput.schema';

export const CommentsUpsertSchema = z.object({
  where: CommentsWhereUniqueInputObjectSchema,
  create: z.union([
    CommentsCreateInputObjectSchema,
    CommentsUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CommentsUpdateInputObjectSchema,
    CommentsUncheckedUpdateInputObjectSchema,
  ]),
});

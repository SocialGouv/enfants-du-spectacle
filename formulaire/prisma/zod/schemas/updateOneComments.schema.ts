import { z } from 'zod';
import { CommentsUpdateInputObjectSchema } from './objects/CommentsUpdateInput.schema';
import { CommentsUncheckedUpdateInputObjectSchema } from './objects/CommentsUncheckedUpdateInput.schema';
import { CommentsWhereUniqueInputObjectSchema } from './objects/CommentsWhereUniqueInput.schema';

export const CommentsUpdateOneSchema = z.object({
  data: z.union([
    CommentsUpdateInputObjectSchema,
    CommentsUncheckedUpdateInputObjectSchema,
  ]),
  where: CommentsWhereUniqueInputObjectSchema,
});

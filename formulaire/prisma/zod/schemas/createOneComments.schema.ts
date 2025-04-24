import { z } from 'zod';
import { CommentsCreateInputObjectSchema } from './objects/CommentsCreateInput.schema';
import { CommentsUncheckedCreateInputObjectSchema } from './objects/CommentsUncheckedCreateInput.schema';

export const CommentsCreateOneSchema = z.object({
  data: z.union([
    CommentsCreateInputObjectSchema,
    CommentsUncheckedCreateInputObjectSchema,
  ]),
});

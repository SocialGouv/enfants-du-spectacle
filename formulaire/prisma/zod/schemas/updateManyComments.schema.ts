import { z } from 'zod';
import { CommentsUpdateManyMutationInputObjectSchema } from './objects/CommentsUpdateManyMutationInput.schema';
import { CommentsWhereInputObjectSchema } from './objects/CommentsWhereInput.schema';

export const CommentsUpdateManySchema = z.object({
  data: CommentsUpdateManyMutationInputObjectSchema,
  where: CommentsWhereInputObjectSchema.optional(),
});

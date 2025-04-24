import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './objects/CommentsWhereUniqueInput.schema';

export const CommentsDeleteOneSchema = z.object({
  where: CommentsWhereUniqueInputObjectSchema,
});

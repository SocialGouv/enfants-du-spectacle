import { z } from 'zod';
import { CommentsOrderByWithRelationInputObjectSchema } from './objects/CommentsOrderByWithRelationInput.schema';
import { CommentsWhereInputObjectSchema } from './objects/CommentsWhereInput.schema';
import { CommentsWhereUniqueInputObjectSchema } from './objects/CommentsWhereUniqueInput.schema';
import { CommentsScalarFieldEnumSchema } from './enums/CommentsScalarFieldEnum.schema';

export const CommentsFindManySchema = z.object({
  orderBy: z
    .union([
      CommentsOrderByWithRelationInputObjectSchema,
      CommentsOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CommentsWhereInputObjectSchema.optional(),
  cursor: CommentsWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CommentsScalarFieldEnumSchema).optional(),
});

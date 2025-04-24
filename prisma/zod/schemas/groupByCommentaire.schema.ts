import { z } from 'zod';
import { CommentaireWhereInputObjectSchema } from './objects/CommentaireWhereInput.schema';
import { CommentaireOrderByWithAggregationInputObjectSchema } from './objects/CommentaireOrderByWithAggregationInput.schema';
import { CommentaireScalarWhereWithAggregatesInputObjectSchema } from './objects/CommentaireScalarWhereWithAggregatesInput.schema';
import { CommentaireScalarFieldEnumSchema } from './enums/CommentaireScalarFieldEnum.schema';

export const CommentaireGroupBySchema = z.object({
  where: CommentaireWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CommentaireOrderByWithAggregationInputObjectSchema,
      CommentaireOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CommentaireScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CommentaireScalarFieldEnumSchema),
});

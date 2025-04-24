import { z } from 'zod';
import { CommentaireOrderByWithRelationInputObjectSchema } from './objects/CommentaireOrderByWithRelationInput.schema';
import { CommentaireWhereInputObjectSchema } from './objects/CommentaireWhereInput.schema';
import { CommentaireWhereUniqueInputObjectSchema } from './objects/CommentaireWhereUniqueInput.schema';
import { CommentaireCountAggregateInputObjectSchema } from './objects/CommentaireCountAggregateInput.schema';
import { CommentaireMinAggregateInputObjectSchema } from './objects/CommentaireMinAggregateInput.schema';
import { CommentaireMaxAggregateInputObjectSchema } from './objects/CommentaireMaxAggregateInput.schema';
import { CommentaireAvgAggregateInputObjectSchema } from './objects/CommentaireAvgAggregateInput.schema';
import { CommentaireSumAggregateInputObjectSchema } from './objects/CommentaireSumAggregateInput.schema';

export const CommentaireAggregateSchema = z.object({
  orderBy: z
    .union([
      CommentaireOrderByWithRelationInputObjectSchema,
      CommentaireOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CommentaireWhereInputObjectSchema.optional(),
  cursor: CommentaireWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), CommentaireCountAggregateInputObjectSchema])
    .optional(),
  _min: CommentaireMinAggregateInputObjectSchema.optional(),
  _max: CommentaireMaxAggregateInputObjectSchema.optional(),
  _avg: CommentaireAvgAggregateInputObjectSchema.optional(),
  _sum: CommentaireSumAggregateInputObjectSchema.optional(),
});

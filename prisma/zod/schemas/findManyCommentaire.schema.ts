import { z } from 'zod';
import { CommentaireOrderByWithRelationInputObjectSchema } from './objects/CommentaireOrderByWithRelationInput.schema';
import { CommentaireWhereInputObjectSchema } from './objects/CommentaireWhereInput.schema';
import { CommentaireWhereUniqueInputObjectSchema } from './objects/CommentaireWhereUniqueInput.schema';
import { CommentaireScalarFieldEnumSchema } from './enums/CommentaireScalarFieldEnum.schema';

export const CommentaireFindManySchema = z.object({
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
  distinct: z.array(CommentaireScalarFieldEnumSchema).optional(),
});

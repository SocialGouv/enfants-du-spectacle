import { z } from 'zod';
import { CommentaireWhereUniqueInputObjectSchema } from './objects/CommentaireWhereUniqueInput.schema';
import { CommentaireCreateInputObjectSchema } from './objects/CommentaireCreateInput.schema';
import { CommentaireUncheckedCreateInputObjectSchema } from './objects/CommentaireUncheckedCreateInput.schema';
import { CommentaireUpdateInputObjectSchema } from './objects/CommentaireUpdateInput.schema';
import { CommentaireUncheckedUpdateInputObjectSchema } from './objects/CommentaireUncheckedUpdateInput.schema';

export const CommentaireUpsertSchema = z.object({
  where: CommentaireWhereUniqueInputObjectSchema,
  create: z.union([
    CommentaireCreateInputObjectSchema,
    CommentaireUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CommentaireUpdateInputObjectSchema,
    CommentaireUncheckedUpdateInputObjectSchema,
  ]),
});

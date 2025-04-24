import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './UserOrderByWithRelationAndSearchRelevanceInput.schema';
import { DossierOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './DossierOrderByWithRelationAndSearchRelevanceInput.schema';
import { CommentaireOrderByRelevanceInputObjectSchema } from './CommentaireOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireOrderByWithRelationAndSearchRelevanceInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      date: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      dossierId: z.lazy(() => SortOrderSchema).optional(),
      seen: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserOrderByWithRelationAndSearchRelevanceInputObjectSchema)
        .optional(),
      dossier: z
        .lazy(
          () => DossierOrderByWithRelationAndSearchRelevanceInputObjectSchema,
        )
        .optional(),
      _relevance: z
        .lazy(() => CommentaireOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const CommentaireOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;

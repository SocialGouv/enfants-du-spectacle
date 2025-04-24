import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DossierOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './DossierOrderByWithRelationAndSearchRelevanceInput.schema';
import { PieceDossierOrderByRelevanceInputObjectSchema } from './PieceDossierOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierOrderByWithRelationAndSearchRelevanceInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      dossierId: z.lazy(() => SortOrderSchema).optional(),
      externalId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      link: z.lazy(() => SortOrderSchema).optional(),
      statut: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      dossier: z
        .lazy(
          () => DossierOrderByWithRelationAndSearchRelevanceInputObjectSchema,
        )
        .optional(),
      _relevance: z
        .lazy(() => PieceDossierOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const PieceDossierOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;

import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EnfantOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './EnfantOrderByWithRelationAndSearchRelevanceInput.schema';
import { PieceDossierEnfantOrderByRelevanceInputObjectSchema } from './PieceDossierEnfantOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantOrderByWithRelationAndSearchRelevanceInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      enfantId: z.lazy(() => SortOrderSchema).optional(),
      dossierId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
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
      enfant: z
        .lazy(
          () => EnfantOrderByWithRelationAndSearchRelevanceInputObjectSchema,
        )
        .optional(),
      _relevance: z
        .lazy(() => PieceDossierEnfantOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const PieceDossierEnfantOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;

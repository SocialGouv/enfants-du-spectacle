import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EnfantOrderByWithRelationInputObjectSchema } from './EnfantOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    enfantId: z.lazy(() => SortOrderSchema).optional(),
    externalId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    link: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    statut: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    enfant: z.lazy(() => EnfantOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const PieceDossierEnfantOrderByWithRelationInputObjectSchema = Schema;

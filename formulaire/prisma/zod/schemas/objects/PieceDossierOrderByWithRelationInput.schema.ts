import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DossierOrderByWithRelationInputObjectSchema } from './DossierOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
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
    dossier: z
      .lazy(() => DossierOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict();

export const PieceDossierOrderByWithRelationInputObjectSchema = Schema;

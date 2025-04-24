import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EnfantOrderByWithRelationInputObjectSchema } from './EnfantOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    typeRemuneration: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    natureCachet: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    autreNatureCachet: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    montant: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    nombre: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    nombreLignes: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    totalDadr: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    comment: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    enfantId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    Enfant: z.lazy(() => EnfantOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const RemunerationOrderByWithRelationInputObjectSchema = Schema;

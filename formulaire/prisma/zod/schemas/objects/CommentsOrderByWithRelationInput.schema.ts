import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DossierOrderByWithRelationInputObjectSchema } from './DossierOrderByWithRelationInput.schema';
import { EnfantOrderByWithRelationInputObjectSchema } from './EnfantOrderByWithRelationInput.schema';
import { CommentsOrderByRelationAggregateInputObjectSchema } from './CommentsOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    text: z.lazy(() => SortOrderSchema).optional(),
    source: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    enfantId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    commentsId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    userId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    externalUserId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    sender: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    seen: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    date: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dossier: z
      .lazy(() => DossierOrderByWithRelationInputObjectSchema)
      .optional(),
    enfant: z.lazy(() => EnfantOrderByWithRelationInputObjectSchema).optional(),
    parentComment: z
      .lazy(() => CommentsOrderByWithRelationInputObjectSchema)
      .optional(),
    Comments: z
      .lazy(() => CommentsOrderByRelationAggregateInputObjectSchema)
      .optional(),
    User: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const CommentsOrderByWithRelationInputObjectSchema = Schema;

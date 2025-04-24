import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AccountOrderByRelationAggregateInputObjectSchema } from './AccountOrderByRelationAggregateInput.schema';
import { SessionOrderByRelationAggregateInputObjectSchema } from './SessionOrderByRelationAggregateInput.schema';
import { DossierOrderByRelationAggregateInputObjectSchema } from './DossierOrderByRelationAggregateInput.schema';
import { EnfantOrderByRelationAggregateInputObjectSchema } from './EnfantOrderByRelationAggregateInput.schema';
import { CommentsOrderByRelationAggregateInputObjectSchema } from './CommentsOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    nom: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    prenom: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    email: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    telephone: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    fonction: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    emailVerified: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    role: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    departement: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    departements: z.lazy(() => SortOrderSchema).optional(),
    Account: z
      .lazy(() => AccountOrderByRelationAggregateInputObjectSchema)
      .optional(),
    Session: z
      .lazy(() => SessionOrderByRelationAggregateInputObjectSchema)
      .optional(),
    dossiers: z
      .lazy(() => DossierOrderByRelationAggregateInputObjectSchema)
      .optional(),
    Enfant: z
      .lazy(() => EnfantOrderByRelationAggregateInputObjectSchema)
      .optional(),
    comments: z
      .lazy(() => CommentsOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserOrderByWithRelationInputObjectSchema = Schema;

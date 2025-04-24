import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AccountOrderByRelationAggregateInputObjectSchema } from './AccountOrderByRelationAggregateInput.schema';
import { SessionOrderByRelationAggregateInputObjectSchema } from './SessionOrderByRelationAggregateInput.schema';
import { DossierOrderByRelationAggregateInputObjectSchema } from './DossierOrderByRelationAggregateInput.schema';
import { CommentaireOrderByRelationAggregateInputObjectSchema } from './CommentaireOrderByRelationAggregateInput.schema';
import { SendListOrderByRelationAggregateInputObjectSchema } from './SendListOrderByRelationAggregateInput.schema';
import { UserOrderByRelevanceInputObjectSchema } from './UserOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserOrderByWithRelationAndSearchRelevanceInput> =
  z
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
      emailVerified: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
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
      accounts: z
        .lazy(() => AccountOrderByRelationAggregateInputObjectSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionOrderByRelationAggregateInputObjectSchema)
        .optional(),
      dossiers: z
        .lazy(() => DossierOrderByRelationAggregateInputObjectSchema)
        .optional(),
      dossiersMedecin: z
        .lazy(() => DossierOrderByRelationAggregateInputObjectSchema)
        .optional(),
      commentaires: z
        .lazy(() => CommentaireOrderByRelationAggregateInputObjectSchema)
        .optional(),
      SendList: z
        .lazy(() => SendListOrderByRelationAggregateInputObjectSchema)
        .optional(),
      _relevance: z
        .lazy(() => UserOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const UserOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;

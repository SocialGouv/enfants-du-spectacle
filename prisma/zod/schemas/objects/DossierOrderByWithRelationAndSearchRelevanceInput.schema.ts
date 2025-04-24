import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CommissionOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './CommissionOrderByWithRelationAndSearchRelevanceInput.schema';
import { SocieteProductionOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './SocieteProductionOrderByWithRelationAndSearchRelevanceInput.schema';
import { EnfantOrderByRelationAggregateInputObjectSchema } from './EnfantOrderByRelationAggregateInput.schema';
import { PieceDossierOrderByRelationAggregateInputObjectSchema } from './PieceDossierOrderByRelationAggregateInput.schema';
import { CommentaireOrderByRelationAggregateInputObjectSchema } from './CommentaireOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './UserOrderByWithRelationAndSearchRelevanceInput.schema';
import { DemandeurOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './DemandeurOrderByWithRelationAndSearchRelevanceInput.schema';
import { DossierOrderByRelevanceInputObjectSchema } from './DossierOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierOrderByWithRelationAndSearchRelevanceInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      nom: z.lazy(() => SortOrderSchema).optional(),
      statut: z.lazy(() => SortOrderSchema).optional(),
      categorie: z.lazy(() => SortOrderSchema).optional(),
      commissionId: z.lazy(() => SortOrderSchema).optional(),
      societeProductionId: z.lazy(() => SortOrderSchema).optional(),
      numeroDS: z
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
      medecinId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      demandeurId: z.lazy(() => SortOrderSchema).optional(),
      justificatifs: z.lazy(() => SortOrderSchema).optional(),
      scenesSensibles: z.lazy(() => SortOrderSchema).optional(),
      presentation: z.lazy(() => SortOrderSchema).optional(),
      conventionCollectiveCode: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      otherConventionCollective: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      dateDebut: z.lazy(() => SortOrderSchema).optional(),
      dateFin: z.lazy(() => SortOrderSchema).optional(),
      externalId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      number: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      dateDerniereModification: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      cdc: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      dateDepot: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      statusNotification: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      source: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      commission: z
        .lazy(
          () =>
            CommissionOrderByWithRelationAndSearchRelevanceInputObjectSchema,
        )
        .optional(),
      societeProduction: z
        .lazy(
          () =>
            SocieteProductionOrderByWithRelationAndSearchRelevanceInputObjectSchema,
        )
        .optional(),
      enfants: z
        .lazy(() => EnfantOrderByRelationAggregateInputObjectSchema)
        .optional(),
      piecesDossier: z
        .lazy(() => PieceDossierOrderByRelationAggregateInputObjectSchema)
        .optional(),
      commentaires: z
        .lazy(() => CommentaireOrderByRelationAggregateInputObjectSchema)
        .optional(),
      user: z
        .lazy(() => UserOrderByWithRelationAndSearchRelevanceInputObjectSchema)
        .optional(),
      medecin: z
        .lazy(() => UserOrderByWithRelationAndSearchRelevanceInputObjectSchema)
        .optional(),
      demandeur: z
        .lazy(
          () => DemandeurOrderByWithRelationAndSearchRelevanceInputObjectSchema,
        )
        .optional(),
      _relevance: z
        .lazy(() => DossierOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const DossierOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;

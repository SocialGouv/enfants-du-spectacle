import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EnfantOrderByRelationAggregateInputObjectSchema } from './EnfantOrderByRelationAggregateInput.schema';
import { PieceDossierOrderByRelationAggregateInputObjectSchema } from './PieceDossierOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { DemandeurOrderByWithRelationInputObjectSchema } from './DemandeurOrderByWithRelationInput.schema';
import { CommentsOrderByRelationAggregateInputObjectSchema } from './CommentsOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    nom: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    statut: z.lazy(() => SortOrderSchema).optional(),
    categorie: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    collaboratorIds: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    justificatifs: z.lazy(() => SortOrderSchema).optional(),
    scenesSensibles: z.lazy(() => SortOrderSchema).optional(),
    presentation: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dateDebut: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dateFin: z
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
    dateCreation: z
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
    scenario: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    securite: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    complementaire: z
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
    demandeurId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    commissionDate: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    commissionString: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    enfants: z
      .lazy(() => EnfantOrderByRelationAggregateInputObjectSchema)
      .optional(),
    piecesDossier: z
      .lazy(() => PieceDossierOrderByRelationAggregateInputObjectSchema)
      .optional(),
    user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    Demandeur: z
      .lazy(() => DemandeurOrderByWithRelationInputObjectSchema)
      .optional(),
    Comments: z
      .lazy(() => CommentsOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const DossierOrderByWithRelationInputObjectSchema = Schema;

import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DemandeurOrderByRelationAggregateInputObjectSchema } from './DemandeurOrderByRelationAggregateInput.schema';
import { DossierOrderByRelationAggregateInputObjectSchema } from './DossierOrderByRelationAggregateInput.schema';
import { SocieteProductionOrderByRelevanceInputObjectSchema } from './SocieteProductionOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionOrderByWithRelationAndSearchRelevanceInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      nom: z.lazy(() => SortOrderSchema).optional(),
      siret: z.lazy(() => SortOrderSchema).optional(),
      siren: z.lazy(() => SortOrderSchema).optional(),
      departement: z.lazy(() => SortOrderSchema).optional(),
      naf: z.lazy(() => SortOrderSchema).optional(),
      raisonSociale: z.lazy(() => SortOrderSchema).optional(),
      adresse: z.lazy(() => SortOrderSchema).optional(),
      adresseCodePostal: z.lazy(() => SortOrderSchema).optional(),
      adresseCodeCommune: z.lazy(() => SortOrderSchema).optional(),
      formeJuridique: z.lazy(() => SortOrderSchema).optional(),
      conventionCollectiveCode: z.lazy(() => SortOrderSchema).optional(),
      otherConventionCollective: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      demandeurs: z
        .lazy(() => DemandeurOrderByRelationAggregateInputObjectSchema)
        .optional(),
      dossiers: z
        .lazy(() => DossierOrderByRelationAggregateInputObjectSchema)
        .optional(),
      _relevance: z
        .lazy(() => SocieteProductionOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const SocieteProductionOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;

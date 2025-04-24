import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PieceDossierEnfantOrderByRelationAggregateInputObjectSchema } from './PieceDossierEnfantOrderByRelationAggregateInput.schema';
import { DossierOrderByWithRelationAndSearchRelevanceInputObjectSchema } from './DossierOrderByWithRelationAndSearchRelevanceInput.schema';
import { EnfantOrderByRelevanceInputObjectSchema } from './EnfantOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantOrderByWithRelationAndSearchRelevanceInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      prenom: z.lazy(() => SortOrderSchema).optional(),
      nom: z.lazy(() => SortOrderSchema).optional(),
      dateNaissance: z.lazy(() => SortOrderSchema).optional(),
      typeEmploi: z.lazy(() => SortOrderSchema).optional(),
      nomPersonnage: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      periodeTravail: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      nombreJours: z.lazy(() => SortOrderSchema).optional(),
      contexteTravail: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      montantCachet: z.lazy(() => SortOrderSchema).optional(),
      nombreCachets: z.lazy(() => SortOrderSchema).optional(),
      nombreLignes: z.lazy(() => SortOrderSchema).optional(),
      remunerationsAdditionnelles: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      remunerationTotale: z.lazy(() => SortOrderSchema).optional(),
      justificatifs: z.lazy(() => SortOrderSchema).optional(),
      dossierId: z.lazy(() => SortOrderSchema).optional(),
      cdc: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      adresseEnfant: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      nomRepresentant1: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      prenomRepresentant1: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      adresseRepresentant1: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      telRepresentant1: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      mailRepresentant1: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      adresseRepresentant2: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      nomRepresentant2: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      prenomRepresentant2: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      telRepresentant2: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      mailRepresentant2: z
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
      typeConsultation: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      typeConsultationMedecin: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      dateConsultation: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      checkTravailNuit: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      textTravailNuit: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      piecesDossier: z
        .lazy(() => PieceDossierEnfantOrderByRelationAggregateInputObjectSchema)
        .optional(),
      dossier: z
        .lazy(
          () => DossierOrderByWithRelationAndSearchRelevanceInputObjectSchema,
        )
        .optional(),
      _relevance: z
        .lazy(() => EnfantOrderByRelevanceInputObjectSchema)
        .optional(),
    })
    .strict();

export const EnfantOrderByWithRelationAndSearchRelevanceInputObjectSchema =
  Schema;

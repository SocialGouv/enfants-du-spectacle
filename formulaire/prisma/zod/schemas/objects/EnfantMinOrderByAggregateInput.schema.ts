import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    prenom: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    dateNaissance: z.lazy(() => SortOrderSchema).optional(),
    typeEmploi: z.lazy(() => SortOrderSchema).optional(),
    nomPersonnage: z.lazy(() => SortOrderSchema).optional(),
    periodeTravail: z.lazy(() => SortOrderSchema).optional(),
    nombreJours: z.lazy(() => SortOrderSchema).optional(),
    contexteTravail: z.lazy(() => SortOrderSchema).optional(),
    montantCachet: z.lazy(() => SortOrderSchema).optional(),
    nombreCachets: z.lazy(() => SortOrderSchema).optional(),
    nombreLignes: z.lazy(() => SortOrderSchema).optional(),
    remunerationsAdditionnelles: z.lazy(() => SortOrderSchema).optional(),
    remunerationTotale: z.lazy(() => SortOrderSchema).optional(),
    dossierId: z.lazy(() => SortOrderSchema).optional(),
    cdc: z.lazy(() => SortOrderSchema).optional(),
    adresseEnfant: z.lazy(() => SortOrderSchema).optional(),
    nomRepresentant1: z.lazy(() => SortOrderSchema).optional(),
    prenomRepresentant1: z.lazy(() => SortOrderSchema).optional(),
    adresseRepresentant1: z.lazy(() => SortOrderSchema).optional(),
    telRepresentant1: z.lazy(() => SortOrderSchema).optional(),
    mailRepresentant1: z.lazy(() => SortOrderSchema).optional(),
    nomRepresentant2: z.lazy(() => SortOrderSchema).optional(),
    prenomRepresentant2: z.lazy(() => SortOrderSchema).optional(),
    adresseRepresentant2: z.lazy(() => SortOrderSchema).optional(),
    telRepresentant2: z.lazy(() => SortOrderSchema).optional(),
    mailRepresentant2: z.lazy(() => SortOrderSchema).optional(),
    livret: z.lazy(() => SortOrderSchema).optional(),
    autorisation: z.lazy(() => SortOrderSchema).optional(),
    situation: z.lazy(() => SortOrderSchema).optional(),
    contrat: z.lazy(() => SortOrderSchema).optional(),
    certificat: z.lazy(() => SortOrderSchema).optional(),
    avis: z.lazy(() => SortOrderSchema).optional(),
    dateDerniereModification: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    typeConsultation: z.lazy(() => SortOrderSchema).optional(),
    dateConsultation: z.lazy(() => SortOrderSchema).optional(),
    checkTravailNuit: z.lazy(() => SortOrderSchema).optional(),
    textTravailNuit: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const EnfantMinOrderByAggregateInputObjectSchema = Schema;

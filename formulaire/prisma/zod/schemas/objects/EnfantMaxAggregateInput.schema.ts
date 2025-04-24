import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    prenom: z.literal(true).optional(),
    nom: z.literal(true).optional(),
    dateNaissance: z.literal(true).optional(),
    typeEmploi: z.literal(true).optional(),
    nomPersonnage: z.literal(true).optional(),
    periodeTravail: z.literal(true).optional(),
    nombreJours: z.literal(true).optional(),
    contexteTravail: z.literal(true).optional(),
    montantCachet: z.literal(true).optional(),
    nombreCachets: z.literal(true).optional(),
    nombreLignes: z.literal(true).optional(),
    remunerationsAdditionnelles: z.literal(true).optional(),
    remunerationTotale: z.literal(true).optional(),
    dossierId: z.literal(true).optional(),
    cdc: z.literal(true).optional(),
    adresseEnfant: z.literal(true).optional(),
    nomRepresentant1: z.literal(true).optional(),
    prenomRepresentant1: z.literal(true).optional(),
    adresseRepresentant1: z.literal(true).optional(),
    telRepresentant1: z.literal(true).optional(),
    mailRepresentant1: z.literal(true).optional(),
    nomRepresentant2: z.literal(true).optional(),
    prenomRepresentant2: z.literal(true).optional(),
    adresseRepresentant2: z.literal(true).optional(),
    telRepresentant2: z.literal(true).optional(),
    mailRepresentant2: z.literal(true).optional(),
    livret: z.literal(true).optional(),
    autorisation: z.literal(true).optional(),
    situation: z.literal(true).optional(),
    contrat: z.literal(true).optional(),
    certificat: z.literal(true).optional(),
    avis: z.literal(true).optional(),
    dateDerniereModification: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    typeConsultation: z.literal(true).optional(),
    dateConsultation: z.literal(true).optional(),
    checkTravailNuit: z.literal(true).optional(),
    textTravailNuit: z.literal(true).optional(),
  })
  .strict();

export const EnfantMaxAggregateInputObjectSchema = Schema;

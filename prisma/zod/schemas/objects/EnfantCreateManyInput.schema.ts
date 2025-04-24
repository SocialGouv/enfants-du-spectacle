import { z } from 'zod';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { EnfantCreatejustificatifsInputObjectSchema } from './EnfantCreatejustificatifsInput.schema';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';
import { TypeConsultationMedecinSchema } from '../enums/TypeConsultationMedecin.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateManyInput> = z
  .object({
    id: z.number().optional(),
    prenom: z.string(),
    nom: z.string(),
    dateNaissance: z.coerce.date(),
    typeEmploi: z.lazy(() => TypeEmploiSchema),
    nomPersonnage: z.string().optional().nullable(),
    periodeTravail: z.string().optional().nullable(),
    nombreJours: z.number(),
    contexteTravail: z.string().optional().nullable(),
    montantCachet: z.number(),
    nombreCachets: z.number().optional(),
    nombreLignes: z.number().optional(),
    remunerationsAdditionnelles: z.string().optional().nullable(),
    remunerationTotale: z.number(),
    justificatifs: z
      .union([
        z.lazy(() => EnfantCreatejustificatifsInputObjectSchema),
        z.lazy(() => JustificatifEnfantSchema).array(),
      ])
      .optional(),
    dossierId: z.number(),
    cdc: z.number().optional().nullable(),
    adresseEnfant: z.string().optional().nullable(),
    nomRepresentant1: z.string().optional().nullable(),
    prenomRepresentant1: z.string().optional().nullable(),
    adresseRepresentant1: z.string().optional().nullable(),
    telRepresentant1: z.string().optional().nullable(),
    mailRepresentant1: z.string().optional().nullable(),
    adresseRepresentant2: z.string().optional().nullable(),
    nomRepresentant2: z.string().optional().nullable(),
    prenomRepresentant2: z.string().optional().nullable(),
    telRepresentant2: z.string().optional().nullable(),
    mailRepresentant2: z.string().optional().nullable(),
    externalId: z.string().optional().nullable(),
    typeConsultation: z
      .lazy(() => TypeConsultationSchema)
      .optional()
      .nullable(),
    typeConsultationMedecin: z
      .lazy(() => TypeConsultationMedecinSchema)
      .optional()
      .nullable(),
    dateConsultation: z.coerce.date().optional().nullable(),
    checkTravailNuit: z.boolean().optional().nullable(),
    textTravailNuit: z.string().optional().nullable(),
  })
  .strict();

export const EnfantCreateManyInputObjectSchema = Schema;

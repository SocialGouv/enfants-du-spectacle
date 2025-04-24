import { z } from 'zod';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { EnfantCreatejustificatifsInputObjectSchema } from './EnfantCreatejustificatifsInput.schema';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';
import { RemunerationCreateNestedManyWithoutEnfantInputObjectSchema } from './RemunerationCreateNestedManyWithoutEnfantInput.schema';
import { PieceDossierEnfantCreateNestedManyWithoutEnfantInputObjectSchema } from './PieceDossierEnfantCreateNestedManyWithoutEnfantInput.schema';
import { UserCreateNestedOneWithoutEnfantInputObjectSchema } from './UserCreateNestedOneWithoutEnfantInput.schema';
import { CommentsCreateNestedManyWithoutEnfantInputObjectSchema } from './CommentsCreateNestedManyWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateWithoutDossierInput> = z
  .object({
    prenom: z.string().optional().nullable(),
    nom: z.string().optional().nullable(),
    dateNaissance: z.coerce.date().optional().nullable(),
    typeEmploi: z
      .lazy(() => TypeEmploiSchema)
      .optional()
      .nullable(),
    nomPersonnage: z.string().optional().nullable(),
    periodeTravail: z.string().optional().nullable(),
    nombreJours: z.number().optional().nullable(),
    contexteTravail: z.string().optional().nullable(),
    montantCachet: z.number().optional().nullable(),
    nombreCachets: z.number().optional().nullable(),
    nombreLignes: z.number().optional().nullable(),
    remunerationsAdditionnelles: z.string().optional().nullable(),
    remunerationTotale: z.number().optional().nullable(),
    justificatifs: z
      .union([
        z.lazy(() => EnfantCreatejustificatifsInputObjectSchema),
        z.lazy(() => JustificatifEnfantSchema).array(),
      ])
      .optional(),
    cdc: z.number().optional().nullable(),
    adresseEnfant: z.string().optional().nullable(),
    nomRepresentant1: z.string().optional().nullable(),
    prenomRepresentant1: z.string().optional().nullable(),
    adresseRepresentant1: z.string().optional().nullable(),
    telRepresentant1: z.string().optional().nullable(),
    mailRepresentant1: z.string().optional().nullable(),
    nomRepresentant2: z.string().optional().nullable(),
    prenomRepresentant2: z.string().optional().nullable(),
    adresseRepresentant2: z.string().optional().nullable(),
    telRepresentant2: z.string().optional().nullable(),
    mailRepresentant2: z.string().optional().nullable(),
    livret: z.string().optional().nullable(),
    autorisation: z.string().optional().nullable(),
    situation: z.string().optional().nullable(),
    contrat: z.string().optional().nullable(),
    certificat: z.string().optional().nullable(),
    avis: z.string().optional().nullable(),
    dateDerniereModification: z.coerce.date().optional().nullable(),
    typeConsultation: z
      .lazy(() => TypeConsultationSchema)
      .optional()
      .nullable(),
    dateConsultation: z.coerce.date().optional().nullable(),
    checkTravailNuit: z.boolean().optional().nullable(),
    textTravailNuit: z.string().optional().nullable(),
    remuneration: z
      .lazy(() => RemunerationCreateNestedManyWithoutEnfantInputObjectSchema)
      .optional(),
    piecesDossier: z
      .lazy(
        () => PieceDossierEnfantCreateNestedManyWithoutEnfantInputObjectSchema,
      )
      .optional(),
    populatedBy: z
      .lazy(() => UserCreateNestedOneWithoutEnfantInputObjectSchema)
      .optional(),
    Comments: z
      .lazy(() => CommentsCreateNestedManyWithoutEnfantInputObjectSchema)
      .optional(),
  })
  .strict();

export const EnfantCreateWithoutDossierInputObjectSchema = Schema;

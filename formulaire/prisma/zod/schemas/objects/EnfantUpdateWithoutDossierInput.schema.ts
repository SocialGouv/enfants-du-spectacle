import { z } from 'zod';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { NullableEnumTypeEmploiFieldUpdateOperationsInputObjectSchema } from './NullableEnumTypeEmploiFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { EnfantUpdatejustificatifsInputObjectSchema } from './EnfantUpdatejustificatifsInput.schema';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';
import { NullableEnumTypeConsultationFieldUpdateOperationsInputObjectSchema } from './NullableEnumTypeConsultationFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { RemunerationUpdateManyWithoutEnfantNestedInputObjectSchema } from './RemunerationUpdateManyWithoutEnfantNestedInput.schema';
import { PieceDossierEnfantUpdateManyWithoutEnfantNestedInputObjectSchema } from './PieceDossierEnfantUpdateManyWithoutEnfantNestedInput.schema';
import { UserUpdateOneWithoutEnfantNestedInputObjectSchema } from './UserUpdateOneWithoutEnfantNestedInput.schema';
import { CommentsUpdateManyWithoutEnfantNestedInputObjectSchema } from './CommentsUpdateManyWithoutEnfantNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateWithoutDossierInput> = z
  .object({
    prenom: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    nom: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    dateNaissance: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    typeEmploi: z
      .union([
        z.lazy(() => TypeEmploiSchema),
        z.lazy(
          () => NullableEnumTypeEmploiFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
    nomPersonnage: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    periodeTravail: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    nombreJours: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    contexteTravail: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    montantCachet: z
      .union([
        z.number(),
        z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    nombreCachets: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    nombreLignes: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    remunerationsAdditionnelles: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    remunerationTotale: z
      .union([
        z.number(),
        z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    justificatifs: z
      .union([
        z.lazy(() => EnfantUpdatejustificatifsInputObjectSchema),
        z.lazy(() => JustificatifEnfantSchema).array(),
      ])
      .optional(),
    cdc: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    adresseEnfant: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    nomRepresentant1: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    prenomRepresentant1: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    adresseRepresentant1: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    telRepresentant1: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    mailRepresentant1: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    nomRepresentant2: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    prenomRepresentant2: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    adresseRepresentant2: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    telRepresentant2: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    mailRepresentant2: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    livret: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    autorisation: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    situation: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    contrat: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    certificat: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    avis: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    dateDerniereModification: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    typeConsultation: z
      .union([
        z.lazy(() => TypeConsultationSchema),
        z.lazy(
          () =>
            NullableEnumTypeConsultationFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
    dateConsultation: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    checkTravailNuit: z
      .union([
        z.boolean(),
        z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    textTravailNuit: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    remuneration: z
      .lazy(() => RemunerationUpdateManyWithoutEnfantNestedInputObjectSchema)
      .optional(),
    piecesDossier: z
      .lazy(
        () => PieceDossierEnfantUpdateManyWithoutEnfantNestedInputObjectSchema,
      )
      .optional(),
    populatedBy: z
      .lazy(() => UserUpdateOneWithoutEnfantNestedInputObjectSchema)
      .optional(),
    Comments: z
      .lazy(() => CommentsUpdateManyWithoutEnfantNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const EnfantUpdateWithoutDossierInputObjectSchema = Schema;

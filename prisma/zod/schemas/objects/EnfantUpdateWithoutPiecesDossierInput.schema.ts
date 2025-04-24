import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { EnumTypeEmploiFieldUpdateOperationsInputObjectSchema } from './EnumTypeEmploiFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { EnfantUpdatejustificatifsInputObjectSchema } from './EnfantUpdatejustificatifsInput.schema';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';
import { NullableEnumTypeConsultationFieldUpdateOperationsInputObjectSchema } from './NullableEnumTypeConsultationFieldUpdateOperationsInput.schema';
import { TypeConsultationMedecinSchema } from '../enums/TypeConsultationMedecin.schema';
import { NullableEnumTypeConsultationMedecinFieldUpdateOperationsInputObjectSchema } from './NullableEnumTypeConsultationMedecinFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { DossierUpdateOneRequiredWithoutEnfantsNestedInputObjectSchema } from './DossierUpdateOneRequiredWithoutEnfantsNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateWithoutPiecesDossierInput> = z
  .object({
    prenom: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    nom: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    dateNaissance: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    typeEmploi: z
      .union([
        z.lazy(() => TypeEmploiSchema),
        z.lazy(() => EnumTypeEmploiFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
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
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
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
        z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    nombreCachets: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    nombreLignes: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
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
        z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
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
    adresseRepresentant2: z
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
    externalId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
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
    typeConsultationMedecin: z
      .union([
        z.lazy(() => TypeConsultationMedecinSchema),
        z.lazy(
          () =>
            NullableEnumTypeConsultationMedecinFieldUpdateOperationsInputObjectSchema,
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
    dossier: z
      .lazy(() => DossierUpdateOneRequiredWithoutEnfantsNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const EnfantUpdateWithoutPiecesDossierInputObjectSchema = Schema;

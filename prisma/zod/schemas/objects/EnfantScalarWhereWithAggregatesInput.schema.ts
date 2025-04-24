import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { EnumTypeEmploiWithAggregatesFilterObjectSchema } from './EnumTypeEmploiWithAggregatesFilter.schema';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema';
import { EnumJustificatifEnfantNullableListFilterObjectSchema } from './EnumJustificatifEnfantNullableListFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { EnumTypeConsultationNullableWithAggregatesFilterObjectSchema } from './EnumTypeConsultationNullableWithAggregatesFilter.schema';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';
import { EnumTypeConsultationMedecinNullableWithAggregatesFilterObjectSchema } from './EnumTypeConsultationMedecinNullableWithAggregatesFilter.schema';
import { TypeConsultationMedecinSchema } from '../enums/TypeConsultationMedecin.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => EnfantScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => EnfantScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => EnfantScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => EnfantScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => EnfantScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    prenom: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    nom: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    dateNaissance: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    typeEmploi: z
      .union([
        z.lazy(() => EnumTypeEmploiWithAggregatesFilterObjectSchema),
        z.lazy(() => TypeEmploiSchema),
      ])
      .optional(),
    nomPersonnage: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    periodeTravail: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    nombreJours: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    contexteTravail: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    montantCachet: z
      .union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    nombreCachets: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    nombreLignes: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    remunerationsAdditionnelles: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    remunerationTotale: z
      .union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    justificatifs: z
      .lazy(() => EnumJustificatifEnfantNullableListFilterObjectSchema)
      .optional(),
    dossierId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    cdc: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    adresseEnfant: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    nomRepresentant1: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    prenomRepresentant1: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    adresseRepresentant1: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    telRepresentant1: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    mailRepresentant1: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    adresseRepresentant2: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    nomRepresentant2: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    prenomRepresentant2: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    telRepresentant2: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    mailRepresentant2: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    externalId: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    typeConsultation: z
      .union([
        z.lazy(
          () => EnumTypeConsultationNullableWithAggregatesFilterObjectSchema,
        ),
        z.lazy(() => TypeConsultationSchema),
      ])
      .optional()
      .nullable(),
    typeConsultationMedecin: z
      .union([
        z.lazy(
          () =>
            EnumTypeConsultationMedecinNullableWithAggregatesFilterObjectSchema,
        ),
        z.lazy(() => TypeConsultationMedecinSchema),
      ])
      .optional()
      .nullable(),
    dateConsultation: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    checkTravailNuit: z
      .union([
        z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema),
        z.boolean(),
      ])
      .optional()
      .nullable(),
    textTravailNuit: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const EnfantScalarWhereWithAggregatesInputObjectSchema = Schema;

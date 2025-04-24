import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { EnumTypeEmploiNullableWithAggregatesFilterObjectSchema } from './EnumTypeEmploiNullableWithAggregatesFilter.schema';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { FloatNullableWithAggregatesFilterObjectSchema } from './FloatNullableWithAggregatesFilter.schema';
import { EnumJustificatifEnfantNullableListFilterObjectSchema } from './EnumJustificatifEnfantNullableListFilter.schema';
import { EnumTypeConsultationNullableWithAggregatesFilterObjectSchema } from './EnumTypeConsultationNullableWithAggregatesFilter.schema';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';
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
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    nom: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    dateNaissance: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    typeEmploi: z
      .union([
        z.lazy(() => EnumTypeEmploiNullableWithAggregatesFilterObjectSchema),
        z.lazy(() => TypeEmploiSchema),
      ])
      .optional()
      .nullable(),
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
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    contexteTravail: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    montantCachet: z
      .union([
        z.lazy(() => FloatNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    nombreCachets: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    nombreLignes: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    remunerationsAdditionnelles: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    remunerationTotale: z
      .union([
        z.lazy(() => FloatNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
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
    adresseRepresentant2: z
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
    livret: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    autorisation: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    situation: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    contrat: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    certificat: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    avis: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    dateDerniereModification: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
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

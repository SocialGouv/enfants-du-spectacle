import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumTypeEmploiNullableFilterObjectSchema } from './EnumTypeEmploiNullableFilter.schema';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { EnumJustificatifEnfantNullableListFilterObjectSchema } from './EnumJustificatifEnfantNullableListFilter.schema';
import { EnumTypeConsultationNullableFilterObjectSchema } from './EnumTypeConsultationNullableFilter.schema';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => EnfantScalarWhereInputObjectSchema),
        z.lazy(() => EnfantScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => EnfantScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => EnfantScalarWhereInputObjectSchema),
        z.lazy(() => EnfantScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    prenom: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    nom: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    dateNaissance: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    typeEmploi: z
      .union([
        z.lazy(() => EnumTypeEmploiNullableFilterObjectSchema),
        z.lazy(() => TypeEmploiSchema),
      ])
      .optional()
      .nullable(),
    nomPersonnage: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    periodeTravail: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    nombreJours: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    contexteTravail: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    montantCachet: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    nombreCachets: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    nombreLignes: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    remunerationsAdditionnelles: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    remunerationTotale: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    justificatifs: z
      .lazy(() => EnumJustificatifEnfantNullableListFilterObjectSchema)
      .optional(),
    dossierId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    cdc: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    adresseEnfant: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    nomRepresentant1: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    prenomRepresentant1: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    adresseRepresentant1: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    telRepresentant1: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    mailRepresentant1: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    nomRepresentant2: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    prenomRepresentant2: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    adresseRepresentant2: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    telRepresentant2: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    mailRepresentant2: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    livret: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    autorisation: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    situation: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    contrat: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    certificat: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    avis: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    dateDerniereModification: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    typeConsultation: z
      .union([
        z.lazy(() => EnumTypeConsultationNullableFilterObjectSchema),
        z.lazy(() => TypeConsultationSchema),
      ])
      .optional()
      .nullable(),
    dateConsultation: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    checkTravailNuit: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
    textTravailNuit: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const EnfantScalarWhereInputObjectSchema = Schema;

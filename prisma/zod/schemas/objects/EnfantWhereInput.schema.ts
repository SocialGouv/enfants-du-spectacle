import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumTypeEmploiFilterObjectSchema } from './EnumTypeEmploiFilter.schema';
import { TypeEmploiSchema } from '../enums/TypeEmploi.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { FloatFilterObjectSchema } from './FloatFilter.schema';
import { EnumJustificatifEnfantNullableListFilterObjectSchema } from './EnumJustificatifEnfantNullableListFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumTypeConsultationNullableFilterObjectSchema } from './EnumTypeConsultationNullableFilter.schema';
import { TypeConsultationSchema } from '../enums/TypeConsultation.schema';
import { EnumTypeConsultationMedecinNullableFilterObjectSchema } from './EnumTypeConsultationMedecinNullableFilter.schema';
import { TypeConsultationMedecinSchema } from '../enums/TypeConsultationMedecin.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { PieceDossierEnfantListRelationFilterObjectSchema } from './PieceDossierEnfantListRelationFilter.schema';
import { DossierRelationFilterObjectSchema } from './DossierRelationFilter.schema';
import { DossierWhereInputObjectSchema } from './DossierWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => EnfantWhereInputObjectSchema),
        z.lazy(() => EnfantWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => EnfantWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => EnfantWhereInputObjectSchema),
        z.lazy(() => EnfantWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    prenom: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    nom: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    dateNaissance: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    typeEmploi: z
      .union([
        z.lazy(() => EnumTypeEmploiFilterObjectSchema),
        z.lazy(() => TypeEmploiSchema),
      ])
      .optional(),
    nomPersonnage: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    periodeTravail: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    nombreJours: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    contexteTravail: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    montantCachet: z
      .union([z.lazy(() => FloatFilterObjectSchema), z.number()])
      .optional(),
    nombreCachets: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    nombreLignes: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    remunerationsAdditionnelles: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    remunerationTotale: z
      .union([z.lazy(() => FloatFilterObjectSchema), z.number()])
      .optional(),
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
    adresseRepresentant2: z
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
    telRepresentant2: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    mailRepresentant2: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    externalId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    typeConsultation: z
      .union([
        z.lazy(() => EnumTypeConsultationNullableFilterObjectSchema),
        z.lazy(() => TypeConsultationSchema),
      ])
      .optional()
      .nullable(),
    typeConsultationMedecin: z
      .union([
        z.lazy(() => EnumTypeConsultationMedecinNullableFilterObjectSchema),
        z.lazy(() => TypeConsultationMedecinSchema),
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
    piecesDossier: z
      .lazy(() => PieceDossierEnfantListRelationFilterObjectSchema)
      .optional(),
    dossier: z
      .union([
        z.lazy(() => DossierRelationFilterObjectSchema),
        z.lazy(() => DossierWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnfantWhereInputObjectSchema = Schema;

import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumStatutDossierFilterObjectSchema } from './EnumStatutDossierFilter.schema';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { EnumCategorieDossierNullableFilterObjectSchema } from './EnumCategorieDossierNullableFilter.schema';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { IntNullableListFilterObjectSchema } from './IntNullableListFilter.schema';
import { EnumJustificatifDossierNullableListFilterObjectSchema } from './EnumJustificatifDossierNullableListFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnfantListRelationFilterObjectSchema } from './EnfantListRelationFilter.schema';
import { PieceDossierListRelationFilterObjectSchema } from './PieceDossierListRelationFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { DemandeurRelationFilterObjectSchema } from './DemandeurRelationFilter.schema';
import { DemandeurWhereInputObjectSchema } from './DemandeurWhereInput.schema';
import { CommentsListRelationFilterObjectSchema } from './CommentsListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => DossierWhereInputObjectSchema),
        z.lazy(() => DossierWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DossierWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DossierWhereInputObjectSchema),
        z.lazy(() => DossierWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    nom: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    statut: z
      .union([
        z.lazy(() => EnumStatutDossierFilterObjectSchema),
        z.lazy(() => StatutDossierSchema),
      ])
      .optional(),
    categorie: z
      .union([
        z.lazy(() => EnumCategorieDossierNullableFilterObjectSchema),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional()
      .nullable(),
    collaboratorIds: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
    userId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    justificatifs: z
      .lazy(() => EnumJustificatifDossierNullableListFilterObjectSchema)
      .optional(),
    scenesSensibles: z
      .lazy(() => StringNullableListFilterObjectSchema)
      .optional(),
    presentation: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    dateDebut: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    dateFin: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    number: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    dateCreation: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    dateDerniereModification: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    cdc: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    scenario: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    securite: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    complementaire: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    dateDepot: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    demandeurId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    commissionDate: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    commissionString: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    enfants: z.lazy(() => EnfantListRelationFilterObjectSchema).optional(),
    piecesDossier: z
      .lazy(() => PieceDossierListRelationFilterObjectSchema)
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    Demandeur: z
      .union([
        z.lazy(() => DemandeurRelationFilterObjectSchema),
        z.lazy(() => DemandeurWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    Comments: z.lazy(() => CommentsListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const DossierWhereInputObjectSchema = Schema;

import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumStatutDossierFilterObjectSchema } from './EnumStatutDossierFilter.schema';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { EnumCategorieDossierFilterObjectSchema } from './EnumCategorieDossierFilter.schema';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumJustificatifDossierNullableListFilterObjectSchema } from './EnumJustificatifDossierNullableListFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumStatusNotifNullableFilterObjectSchema } from './EnumStatusNotifNullableFilter.schema';
import { StatusNotifSchema } from '../enums/StatusNotif.schema';
import { EnumSourceNullableFilterObjectSchema } from './EnumSourceNullableFilter.schema';
import { SourceSchema } from '../enums/Source.schema';
import { CommissionRelationFilterObjectSchema } from './CommissionRelationFilter.schema';
import { CommissionWhereInputObjectSchema } from './CommissionWhereInput.schema';
import { SocieteProductionRelationFilterObjectSchema } from './SocieteProductionRelationFilter.schema';
import { SocieteProductionWhereInputObjectSchema } from './SocieteProductionWhereInput.schema';
import { EnfantListRelationFilterObjectSchema } from './EnfantListRelationFilter.schema';
import { PieceDossierListRelationFilterObjectSchema } from './PieceDossierListRelationFilter.schema';
import { CommentaireListRelationFilterObjectSchema } from './CommentaireListRelationFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { DemandeurRelationFilterObjectSchema } from './DemandeurRelationFilter.schema';
import { DemandeurWhereInputObjectSchema } from './DemandeurWhereInput.schema';

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
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    statut: z
      .union([
        z.lazy(() => EnumStatutDossierFilterObjectSchema),
        z.lazy(() => StatutDossierSchema),
      ])
      .optional(),
    categorie: z
      .union([
        z.lazy(() => EnumCategorieDossierFilterObjectSchema),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional(),
    commissionId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    societeProductionId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    numeroDS: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    medecinId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    demandeurId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    justificatifs: z
      .lazy(() => EnumJustificatifDossierNullableListFilterObjectSchema)
      .optional(),
    scenesSensibles: z
      .lazy(() => StringNullableListFilterObjectSchema)
      .optional(),
    presentation: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    conventionCollectiveCode: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    otherConventionCollective: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    dateDebut: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    dateFin: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    externalId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    number: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
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
    dateDepot: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    statusNotification: z
      .union([
        z.lazy(() => EnumStatusNotifNullableFilterObjectSchema),
        z.lazy(() => StatusNotifSchema),
      ])
      .optional()
      .nullable(),
    source: z
      .union([
        z.lazy(() => EnumSourceNullableFilterObjectSchema),
        z.lazy(() => SourceSchema),
      ])
      .optional()
      .nullable(),
    commission: z
      .union([
        z.lazy(() => CommissionRelationFilterObjectSchema),
        z.lazy(() => CommissionWhereInputObjectSchema),
      ])
      .optional(),
    societeProduction: z
      .union([
        z.lazy(() => SocieteProductionRelationFilterObjectSchema),
        z.lazy(() => SocieteProductionWhereInputObjectSchema),
      ])
      .optional(),
    enfants: z.lazy(() => EnfantListRelationFilterObjectSchema).optional(),
    piecesDossier: z
      .lazy(() => PieceDossierListRelationFilterObjectSchema)
      .optional(),
    commentaires: z
      .lazy(() => CommentaireListRelationFilterObjectSchema)
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    medecin: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    demandeur: z
      .union([
        z.lazy(() => DemandeurRelationFilterObjectSchema),
        z.lazy(() => DemandeurWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const DossierWhereInputObjectSchema = Schema;

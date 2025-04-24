import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumStatutDossierWithAggregatesFilterObjectSchema } from './EnumStatutDossierWithAggregatesFilter.schema';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { EnumCategorieDossierWithAggregatesFilterObjectSchema } from './EnumCategorieDossierWithAggregatesFilter.schema';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { EnumJustificatifDossierNullableListFilterObjectSchema } from './EnumJustificatifDossierNullableListFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { EnumStatusNotifNullableWithAggregatesFilterObjectSchema } from './EnumStatusNotifNullableWithAggregatesFilter.schema';
import { StatusNotifSchema } from '../enums/StatusNotif.schema';
import { EnumSourceNullableWithAggregatesFilterObjectSchema } from './EnumSourceNullableWithAggregatesFilter.schema';
import { SourceSchema } from '../enums/Source.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => DossierScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => DossierScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DossierScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DossierScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => DossierScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    nom: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    statut: z
      .union([
        z.lazy(() => EnumStatutDossierWithAggregatesFilterObjectSchema),
        z.lazy(() => StatutDossierSchema),
      ])
      .optional(),
    categorie: z
      .union([
        z.lazy(() => EnumCategorieDossierWithAggregatesFilterObjectSchema),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional(),
    commissionId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    societeProductionId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    numeroDS: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
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
    medecinId: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    demandeurId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    justificatifs: z
      .lazy(() => EnumJustificatifDossierNullableListFilterObjectSchema)
      .optional(),
    scenesSensibles: z
      .lazy(() => StringNullableListFilterObjectSchema)
      .optional(),
    presentation: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    conventionCollectiveCode: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    otherConventionCollective: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    dateDebut: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    dateFin: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    externalId: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    number: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
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
    cdc: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    dateDepot: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    statusNotification: z
      .union([
        z.lazy(() => EnumStatusNotifNullableWithAggregatesFilterObjectSchema),
        z.lazy(() => StatusNotifSchema),
      ])
      .optional()
      .nullable(),
    source: z
      .union([
        z.lazy(() => EnumSourceNullableWithAggregatesFilterObjectSchema),
        z.lazy(() => SourceSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const DossierScalarWhereWithAggregatesInputObjectSchema = Schema;

import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumStatutDossierWithAggregatesFilterObjectSchema } from './EnumStatutDossierWithAggregatesFilter.schema';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { EnumCategorieDossierNullableWithAggregatesFilterObjectSchema } from './EnumCategorieDossierNullableWithAggregatesFilter.schema';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { IntNullableListFilterObjectSchema } from './IntNullableListFilter.schema';
import { EnumJustificatifDossierNullableListFilterObjectSchema } from './EnumJustificatifDossierNullableListFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';

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
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    statut: z
      .union([
        z.lazy(() => EnumStatutDossierWithAggregatesFilterObjectSchema),
        z.lazy(() => StatutDossierSchema),
      ])
      .optional(),
    categorie: z
      .union([
        z.lazy(
          () => EnumCategorieDossierNullableWithAggregatesFilterObjectSchema,
        ),
        z.lazy(() => CategorieDossierSchema),
      ])
      .optional()
      .nullable(),
    collaboratorIds: z.lazy(() => IntNullableListFilterObjectSchema).optional(),
    userId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    justificatifs: z
      .lazy(() => EnumJustificatifDossierNullableListFilterObjectSchema)
      .optional(),
    scenesSensibles: z
      .lazy(() => StringNullableListFilterObjectSchema)
      .optional(),
    presentation: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    dateDebut: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    dateFin: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
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
    dateCreation: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
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
    scenario: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    securite: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    complementaire: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
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
    demandeurId: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    commissionDate: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    commissionString: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const DossierScalarWhereWithAggregatesInputObjectSchema = Schema;

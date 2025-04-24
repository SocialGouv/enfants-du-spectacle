import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumJustificatifDossierWithAggregatesFilterObjectSchema } from './EnumJustificatifDossierWithAggregatesFilter.schema';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumSTATUT_PIECENullableWithAggregatesFilterObjectSchema } from './EnumSTATUT_PIECENullableWithAggregatesFilter.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PieceDossierScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => PieceDossierScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PieceDossierScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PieceDossierScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => PieceDossierScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    dossierId: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    externalId: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => EnumJustificatifDossierWithAggregatesFilterObjectSchema),
        z.lazy(() => JustificatifDossierSchema),
      ])
      .optional(),
    link: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    statut: z
      .union([
        z.lazy(() => EnumSTATUT_PIECENullableWithAggregatesFilterObjectSchema),
        z.lazy(() => STATUT_PIECESchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const PieceDossierScalarWhereWithAggregatesInputObjectSchema = Schema;

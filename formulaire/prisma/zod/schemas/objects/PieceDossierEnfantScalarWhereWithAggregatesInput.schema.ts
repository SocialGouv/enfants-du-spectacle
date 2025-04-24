import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumJustificatifEnfantWithAggregatesFilterObjectSchema } from './EnumJustificatifEnfantWithAggregatesFilter.schema';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { EnumSTATUT_PIECENullableWithAggregatesFilterObjectSchema } from './EnumSTATUT_PIECENullableWithAggregatesFilter.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () => PieceDossierEnfantScalarWhereWithAggregatesInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierEnfantScalarWhereWithAggregatesInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(
          () => PieceDossierEnfantScalarWhereWithAggregatesInputObjectSchema,
        )
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () => PieceDossierEnfantScalarWhereWithAggregatesInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PieceDossierEnfantScalarWhereWithAggregatesInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
        .optional(),
      nom: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      enfantId: z
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
          z.lazy(() => EnumJustificatifEnfantWithAggregatesFilterObjectSchema),
          z.lazy(() => JustificatifEnfantSchema),
        ])
        .optional(),
      link: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      statut: z
        .union([
          z.lazy(
            () => EnumSTATUT_PIECENullableWithAggregatesFilterObjectSchema,
          ),
          z.lazy(() => STATUT_PIECESchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PieceDossierEnfantScalarWhereWithAggregatesInputObjectSchema =
  Schema;

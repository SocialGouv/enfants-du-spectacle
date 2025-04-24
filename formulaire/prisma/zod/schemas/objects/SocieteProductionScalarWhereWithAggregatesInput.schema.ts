import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () => SocieteProductionScalarWhereWithAggregatesInputObjectSchema,
          ),
          z
            .lazy(
              () => SocieteProductionScalarWhereWithAggregatesInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SocieteProductionScalarWhereWithAggregatesInputObjectSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () => SocieteProductionScalarWhereWithAggregatesInputObjectSchema,
          ),
          z
            .lazy(
              () => SocieteProductionScalarWhereWithAggregatesInputObjectSchema,
            )
            .array(),
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
      siret: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      siren: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      departement: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      naf: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      raisonSociale: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      adresse: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      adresseCodePostal: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      adresseCodeCommune: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      formeJuridique: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SocieteProductionScalarWhereWithAggregatesInputObjectSchema =
  Schema;

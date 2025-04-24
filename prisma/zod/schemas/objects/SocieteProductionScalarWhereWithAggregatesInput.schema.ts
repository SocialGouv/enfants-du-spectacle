import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
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
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      siret: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      siren: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      departement: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      naf: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      raisonSociale: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      adresse: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      adresseCodePostal: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      adresseCodeCommune: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      formeJuridique: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      conventionCollectiveCode: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      otherConventionCollective: z
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

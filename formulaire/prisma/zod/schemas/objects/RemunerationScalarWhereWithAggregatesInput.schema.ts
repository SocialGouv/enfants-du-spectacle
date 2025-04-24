import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumNatureCachetNullableWithAggregatesFilterObjectSchema } from './EnumNatureCachetNullableWithAggregatesFilter.schema';
import { NatureCachetSchema } from '../enums/NatureCachet.schema';
import { FloatNullableWithAggregatesFilterObjectSchema } from './FloatNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RemunerationScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => RemunerationScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RemunerationScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RemunerationScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => RemunerationScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    typeRemuneration: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    natureCachet: z
      .union([
        z.lazy(() => EnumNatureCachetNullableWithAggregatesFilterObjectSchema),
        z.lazy(() => NatureCachetSchema),
      ])
      .optional()
      .nullable(),
    autreNatureCachet: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    montant: z
      .union([
        z.lazy(() => FloatNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    nombre: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    nombreLignes: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    totalDadr: z
      .union([
        z.lazy(() => FloatNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    comment: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    enfantId: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const RemunerationScalarWhereWithAggregatesInputObjectSchema = Schema;

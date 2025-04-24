import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumNatureCachetNullableFilterObjectSchema } from './EnumNatureCachetNullableFilter.schema';
import { NatureCachetSchema } from '../enums/NatureCachet.schema';
import { FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnfantRelationFilterObjectSchema } from './EnfantRelationFilter.schema';
import { EnfantWhereInputObjectSchema } from './EnfantWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RemunerationWhereInputObjectSchema),
        z.lazy(() => RemunerationWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RemunerationWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RemunerationWhereInputObjectSchema),
        z.lazy(() => RemunerationWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    typeRemuneration: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    natureCachet: z
      .union([
        z.lazy(() => EnumNatureCachetNullableFilterObjectSchema),
        z.lazy(() => NatureCachetSchema),
      ])
      .optional()
      .nullable(),
    autreNatureCachet: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    montant: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    nombre: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    nombreLignes: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    totalDadr: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    comment: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    enfantId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    Enfant: z
      .union([
        z.lazy(() => EnfantRelationFilterObjectSchema),
        z.lazy(() => EnfantWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const RemunerationWhereInputObjectSchema = Schema;

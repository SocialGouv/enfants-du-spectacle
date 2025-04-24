import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => DemandeurScalarWhereInputObjectSchema),
        z.lazy(() => DemandeurScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DemandeurScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DemandeurScalarWhereInputObjectSchema),
        z.lazy(() => DemandeurScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    email: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    nom: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    prenom: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    phone: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    fonction: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    conventionCollectiveCode: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    otherConventionCollective: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    societeProductionId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
  })
  .strict();

export const DemandeurScalarWhereInputObjectSchema = Schema;

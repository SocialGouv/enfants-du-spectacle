import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';

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
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    nom: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    prenom: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    phone: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    fonction: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    societeProductionId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
  })
  .strict();

export const DemandeurScalarWhereInputObjectSchema = Schema;

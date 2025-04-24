import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { DossierListRelationFilterObjectSchema } from './DossierListRelationFilter.schema';
import { SendListListRelationFilterObjectSchema } from './SendListListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommissionWhereInputObjectSchema),
        z.lazy(() => CommissionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommissionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommissionWhereInputObjectSchema),
        z.lazy(() => CommissionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    departement: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    date: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    dateLimiteDepot: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    lastSent: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    archived: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
    dossiers: z.lazy(() => DossierListRelationFilterObjectSchema).optional(),
    SendList: z.lazy(() => SendListListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const CommissionWhereInputObjectSchema = Schema;

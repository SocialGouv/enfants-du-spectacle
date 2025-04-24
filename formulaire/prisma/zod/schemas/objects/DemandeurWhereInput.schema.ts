import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { SocieteProductionRelationFilterObjectSchema } from './SocieteProductionRelationFilter.schema';
import { SocieteProductionWhereInputObjectSchema } from './SocieteProductionWhereInput.schema';
import { DossierListRelationFilterObjectSchema } from './DossierListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => DemandeurWhereInputObjectSchema),
        z.lazy(() => DemandeurWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DemandeurWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DemandeurWhereInputObjectSchema),
        z.lazy(() => DemandeurWhereInputObjectSchema).array(),
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
    societeProduction: z
      .union([
        z.lazy(() => SocieteProductionRelationFilterObjectSchema),
        z.lazy(() => SocieteProductionWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    dossiers: z.lazy(() => DossierListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const DemandeurWhereInputObjectSchema = Schema;

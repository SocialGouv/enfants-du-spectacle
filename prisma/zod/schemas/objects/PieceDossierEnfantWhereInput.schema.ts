import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumJustificatifEnfantFilterObjectSchema } from './EnumJustificatifEnfantFilter.schema';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumSTATUT_PIECENullableFilterObjectSchema } from './EnumSTATUT_PIECENullableFilter.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';
import { EnfantRelationFilterObjectSchema } from './EnfantRelationFilter.schema';
import { EnfantWhereInputObjectSchema } from './EnfantWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PieceDossierEnfantWhereInputObjectSchema),
        z.lazy(() => PieceDossierEnfantWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PieceDossierEnfantWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PieceDossierEnfantWhereInputObjectSchema),
        z.lazy(() => PieceDossierEnfantWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    enfantId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    dossierId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    externalId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => EnumJustificatifEnfantFilterObjectSchema),
        z.lazy(() => JustificatifEnfantSchema),
      ])
      .optional(),
    link: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    statut: z
      .union([
        z.lazy(() => EnumSTATUT_PIECENullableFilterObjectSchema),
        z.lazy(() => STATUT_PIECESchema),
      ])
      .optional()
      .nullable(),
    enfant: z
      .union([
        z.lazy(() => EnfantRelationFilterObjectSchema),
        z.lazy(() => EnfantWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const PieceDossierEnfantWhereInputObjectSchema = Schema;
